const { Router } = require('express');
const { getCategories } = require('../controllers/categories');

const router = new Router();

router.get( '/', getCategories );


module.exports = router;