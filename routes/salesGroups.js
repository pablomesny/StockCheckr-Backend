const { Router } = require('express');
const { getSalesGroups, createSalesGroup } = require('../controllers/salesGroups');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.get( '/', getSalesGroups );

router.post( '/', [
    validateJWT,
    check( 'sales', 'Sales are mandatory' ).not().isEmpty(),
    check( 'totalPrice', 'Total price is mandatory' ).not().isEmpty(),
    validateFields
], createSalesGroup );


module.exports = router;