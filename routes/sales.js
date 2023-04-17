const { Router } = require('express');
const { getSales, createSale, getSalesByUserId, getSaleById } = require('../controllers/sales');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { userByIdExists, saleByIdExists } = require('../middlewares/db-validators');

const router = new Router();

router.get( '/', getSales );

router.get( '/:userId', [
    validateJWT,
    check( 'userId', 'UserID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getSalesByUserId );

router.get( '/sale/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( saleByIdExists ),
    validateFields
], getSaleById );

router.post( '/:userId', [
    validateJWT,
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    check( 'product', 'Product is mandatory' ).not().isEmpty(),
    validateFields
], createSale );


module.exports = router;