const { Router } = require('express');
const { getSales, createSale } = require('../controllers/sales');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { userByIdExists } = require('../middlewares/db-validators');

const router = new Router();

router.get( '/', getSales );

router.post( '/:userId', [
    validateJWT,
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    check( 'product', 'Product is mandatory' ).not().isEmpty(),
    validateFields
], createSale );


module.exports = router;