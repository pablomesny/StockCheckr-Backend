const { Router } = require('express');
const { getSalesGroups, createSalesGroup, updateSalesGroup } = require('../controllers/salesGroups');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');
const { salesGroupByIdExists } = require('../middlewares/db-validators');

const router = new Router();

router.get( '/', getSalesGroups );

router.post( '/', [
    validateJWT,
    check( 'sales', 'Sales are mandatory' ).not().isEmpty(),
    check( 'totalPrice', 'Total price is mandatory' ).not().isEmpty(),
    validateFields
], createSalesGroup );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( salesGroupByIdExists ),
    validateFields
], updateSalesGroup );


module.exports = router;