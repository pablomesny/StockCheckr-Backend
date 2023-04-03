const { Router } = require('express');
const { check } = requre('express-validator');
const { getBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/brands');
const { brandExists, brandByIdExists, isBrandCreatedByUser } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.get( '/', getBrands );

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
    check( 'state', 'State is mandatory' ).not().isEmpty(),
    check( 'state', 'State can only be setted to a boolean value' ).isBoolean(),
    validateFields
], updateBrand );

router.delete( '/:id' [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( brandByIdExists ),
    check( 'id' ).custom( isBrandCreatedByUser ),
    validateFields
], deleteBrand );


module.exports = router;