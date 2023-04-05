const { Router } = require('express');
const { check } = require('express-validator');
const { getBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/brands');
const { brandExists, brandByIdExists, isBrandCreatedByUser, userByIdExists } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getBrands );

router.post( '/', [
    validateJWT,
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    check( 'name' ).custom( brandExists ),
    validateFields
], createBrand );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'Id is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( brandByIdExists ),
    check( 'id' ).custom( isBrandCreatedByUser ),
    validateFields
], updateBrand );

router.delete( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( brandByIdExists ),
    check( 'id' ).custom( isBrandCreatedByUser ),
    validateFields
], deleteBrand );


module.exports = router;