const { Router } = require('express');
const { check } = require('express-validator');
const { getAttributes, createAttribute } = require('../controllers/attributes');
const { attributeGroupByIdExists } = require('../middlewares/db-validators');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.get( '/:groupId', [
    check( 'groupId', 'Group ID is mandatory' ).not().isEmpty(),
    check( 'groupId' ).custom( attributeGroupByIdExists )
], getAttributes );

router.post( '/:groupId', [
    validateJWT,
    check( 'groupId', 'Group ID is mandatory' ).not().isEmpty(),
    check( 'groupId' ).custom( attributeGroupByIdExists ),
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    validateFields
], createAttribute );


module.exports = router;