const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const {
	create,
	getAll,
	update,
	deleteOne,
	getOne,
} = require('../controllers/issue');

router.post('/add-issue',create);
router.get('/list-issues', getAll);
router.patch('/update-issue/:id', update);
router.delete('/delete-issue/:id', deleteOne);
router.get('/list-issues', getOne); 

module.exports = router;