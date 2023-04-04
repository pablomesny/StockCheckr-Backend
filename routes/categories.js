const { Router } = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { userByIdExists, categoryExists, categoryByIdExists, isCategoryCreatedByUser } = require('../middlewares/db-validators');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getCategories );

router.post( '/', [
    validateJWT,
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    check( 'name' ).custom( categoryExists ),
    validateFields
], createCategory );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory').not().isEmpty(),
    check( 'id' ).custom( categoryByIdExists ),
    check( 'id' ).custom( isCategoryCreatedByUser ),
    validateFields
], updateCategory );

router.delete( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( categoryByIdExists ),
    check( 'id' ).custom( isCategoryCreatedByUser ),
    validateFields
], deleteCategory );


module.exports = router;