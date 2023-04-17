const { Router } = require('express');
const { getSales, createSale, getSalesByUserId, getSaleById, updateSale, deleteSale } = require('../controllers/sales');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { userByIdExists, saleByIdExists, isSaleCreatedByUser } = require('../middlewares/db-validators');

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

router.post( '/', [
    validateJWT,
    check( 'product', 'Product is mandatory' ).not().isEmpty(),
    validateFields
], createSale );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( saleByIdExists ),
    check( 'id' ).custom( isSaleCreatedByUser ),
    validateFields
], updateSale );

router.delete( ':id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( saleByIdExists ),
    check( 'id' ).custom( isSaleCreatedByUser ),
    validateFields
], deleteSale );


module.exports = router;