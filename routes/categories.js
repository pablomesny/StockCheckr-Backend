const { Router } = require('express');
const { getCategories } = require('../controllers/categories');
const { userByIdExists } = require('../middlewares/db-validators');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists )
], getCategories );


module.exports = router;