const { Router } = require('express');
const { createProduct, getProducts, updateProduct, getProductById, deleteProduct, getProductsByBrand, getProductsByCategory } = require('../controllers/products');
const validateJWT = require('../middlewares/validate-jwt');
const { productExists, brandByIdExists, categoryByIdExists, userByIdExists, productByIdExists, isProductCreatedByUser, productsByBrandExist, productsByCategoryExist } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');
const { groupByIdExists } = require('../middlewares/db-validators');
const { check } = require('express-validator');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getProducts );

router.get( '/product/:id', [
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( productByIdExists ),
    validateFields
], getProductById );

router.get( '/brand/:id', [
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( brandByIdExists ),
    check( 'id' ).custom( productsByBrandExist ),
    validateFields
], getProductsByBrand );

router.get( '/category/:id', [
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( categoryByIdExists ),
    check( 'id' ).custom( productsByCategoryExist ),
], getProductsByCategory );

router.post( '/', [
    validateJWT,
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    check( 'name' ).custom( productExists ),
    check( 'price', 'Price is mandatory' ).not().isEmpty(),
    check( 'group', 'Group is mandatory' ).not().isEmpty(),
    check( 'group', 'Group should be setted as an ID value' ).isInt(),
    check( 'group' ).custom( groupByIdExists ),
    check( 'brand', 'Brand is mandatory' ).not().isEmpty(),
    check( 'brand', 'Brand should be setted as an ID value' ).isInt(),
    check( 'brand' ).custom( brandByIdExists ),
    check( 'category', 'Category is mandatory' ).not().isEmpty(),
    check( 'category', 'Category should be setted as an ID value' ).isInt(),
    check( 'category' ).custom( categoryByIdExists ),
    validateFields
], createProduct );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( productByIdExists ),
    check( 'id' ).custom( isProductCreatedByUser ),
    validateFields
], updateProduct );

router.delete( ':id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( productByIdExists ),
    check( 'id' ).custom( isProductCreatedByUser ),
    validateFields
], deleteProduct );


module.exports = router;