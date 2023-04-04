const { Router } = require('express');
const { getCategories, createCategory } = require('../controllers/categories');
const { userByIdExists, categoryExists } = require('../middlewares/db-validators');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists )
], getCategories );

router.post( '/', [
    validateJWT,
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    check( 'name' ).custom( categoryExists ),
    validateFields
], createCategory );


module.exports = router;