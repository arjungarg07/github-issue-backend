module.exports = {
	postgresDbConfig: {
		publicAnonKey: process.env.PUBLICANONKEY,
		url: process.env.url,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PWD,
		timeout: '15000',
	},
};
// module.exports = {
// 		mysqlDbConfig: {
// 			host: process.env.DATABASE_URL,
// 			user: process.env.DATABASE_USER,
// 			password: process.env.DATABASE_PWD,
// 			timeout: '15000',
// 		},
// };
