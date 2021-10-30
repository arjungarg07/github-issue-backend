const { commonQuery } = require('../db');
const { createClient } = require('@supabase/supabase-js');
const { postgresDbConfig } = require('../config/default');
const supabase = createClient(postgresDbConfig.url, postgresDbConfig.publicAnonKey);


async function create(req, res) {
	try {
		const { title, description } = req.body;
		if (!title && !description) {
			res.status(422).json({
				message: 'Title and description both are required',
				success: false,
			});
		}
		const INSERT_QUERY = `INSERT INTO database1.Issues SET ?;`;
		const { data, error } = await supabase.from('Issues')
								.insert([{ title, description, createdAt: new Date(), updatedAt: new Date()}]);
		// console.log(data,error);
		// await commonQuery(INSERT_QUERY, {
		// 	title,
		// 	description,
		// 	createdAt: new Date(),
		// 	updatedAt: new Date(),
		// });

		res.json({
			message: 'Successfully created an issue',
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.json({
			message: 'Internal Server Error',
			success: false,
		});
	}
}

async function update(req, res) {
	try {
		const { id: unformatted_id } = req.params;
		const id = Number(unformatted_id); //Validation
		if (Number.isNaN(id) || id < 1)
			return res.status(422).json({
				success: false,
				message: 'issue id is invalid',
			});
		const { description, isOpen } = req.body;
		const { data, error } = await supabase
			.from('Issues')
			.update({...(description && { description }), ...((isOpen===0 || isOpen === 1) && { isOpen }), updatedAt: new Date(),})
			.eq('id', id)
			.eq('isOpen', 1)
			.eq('active',1);
		console.log(data,error);
		// const { affectedRows } = await commonQuery(
		// 	`UPDATE database1.Issues SET ? WHERE id = ${id} AND isOpen = 1 AND active = 1;`,
		// 	{
		// 		...(description && { description }),
		// 		...((isOpen===0 || isOpen === 1) && { isOpen }),
		// 		updatedAt: new Date(),
		// 	}
		// );
		// if (affectedRows === 0)
		// 	return res
		// 		.status(422)
		// 		.json({
		// 			success: false,
		// 			message: 'Issue is closed or id is invalid',
		// 		});

		res.json({
			message: 'Successfully update an issue',
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.json({
			message: 'Internal server error',
			success: false,
		});
	}
}

async function getAll(req, res) {
	try {
		const { page: unformatted_page, isOpen='true', isClosed='true'} = req.query;
		const page = Number(unformatted_page);
		if (Number.isNaN(page) || page < 0)
			return res.status(422).json({
				success: false,
				message: 'Page number is invalid',
			});
		const begin = (page) * 10;

		// const GET_ALL_QUERY = `SELECT SQL_CALC_FOUND_ROWS isOpen,id,title,description,createdAt FROM database1.Issues WHERE active = 1 ${
		// 	isOpen === 'true' && isClosed === 'true'
		// 		? ''
		// 		: `AND ${isOpen === 'true' ? 'isOpen=1' : 'isOpen=0'}`
		// } ORDER BY id DESC LIMIT ${begin},10;`;
		// const list = await commonQuery(GET_ALL_QUERY);
		// const [{ totalResults }] = await commonQuery('SELECT FOUND_ROWS() as totalResults;');
		let result;
		console.log(isOpen,isClosed);
		console.log(isOpen && isClosed);
		if(isOpen==='true' && isClosed==='true'){
			 result = await supabase
			.from('Issues')
			.select('id,title,description,isOpen,createdAt')
			.eq('active',1)
			.order('id', { ascending: false })
			.limit(begin,10);
		}else if(isClosed==='true'){
			result = await supabase
			.from('Issues')
			.select('id,title,description,isOpen,createdAt')
			.eq('active',1)
			.eq('isOpen',0)
			.order('id', { ascending: false })
			.limit(begin,10);
		}else if(isOpen==='true'){
			result = await supabase
			.from('Issues')
			.select('id,title,description,isOpen,createdAt')
			.eq('active',1)
			.eq('isOpen',1)
			.order('id', { ascending: false })
			.limit(begin,10);
		}
		// console.log(result.data, result.error);
		const list = result.data;
		const totalPages = Math.ceil(list.length/10);
		res.json({
			data: { list, totalPages, currentPage: page},
			message: 'Successfully fetched issues',
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			message: 'Internal server error',
			success: false,
		});
	}
}

async function deleteOne(req, res) {
	try {
		const { id: unformatted_id } = req.params;
		const id = Number(unformatted_id);
		if (Number.isNaN(id) || id < 1)
			return res.status(422).json({
				success: false,
				message: 'issue id is invalid',
			});

		// const DELETE_QUERY = `UPDATE database1.Issues SET active = 0 WHERE id = ${id};`;
		// await commonQuery(DELETE_QUERY);
		const { data, error } = await supabase
			.from('Issues')
			.update({ active: 0 })
			.eq('id', id);
		res.json({
			message: 'Successfully deleted an issue',
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.json({
			message: 'Internal server error',
			success: false,
		});
	}
}

async function getOne(req, res) {
	try {
		const { id: unformatted_id } = req.query;
		const id = Number(unformatted_id);
		if (Number.isNaN(id) || id < 1)
			return res.status(422).json({
				success: false,
				message: 'issue id is invalid',
			});

		// const FETCH_QUERY = `SELECT title,description,createdAt FROM database1.Issues WHERE id = ${id} AND active = 1;`;
		// const data = await commonQuery(FETCH_QUERY);
		const {data,error} = await supabase
			.from('Issues')
			.select('title,description,createdAt')
			.eq('active',1)
			.eq('id',id);

		res.json({
			data: data,
			message: 'Successfully fetched an issue',
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.json({
			message: 'Internal server error',
			success: false,
		});
	}
}

module.exports = {
	create,
	update,
	getAll,
	deleteOne,
	getOne,
};
