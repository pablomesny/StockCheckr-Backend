const { Router } = require('express');
const { getAttributeGroups, createAttributeGroup, updateAttributeGroup, deleteAttributeGroup } = require('../controllers/attributeGroups');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { attributeGroupExists, attributeGroupByIdExists, isAttributeGroupCreatedByUser } = require('../middlewares/db-validators');

const router = new Router();

router.get( '/', getAttributeGroups );

router.post( '/', [
    validateJWT,
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    check( 'name' ).custom( attributeGroupExists ),
    validateFields
], createAttributeGroup );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( attributeGroupByIdExists ),
    check( 'id' ).custom( isAttributeGroupCreatedByUser ),
    check( 'state', 'State is mandatory' ).not().isEmpty(),
    check( 'state', 'State can only be setted to a boolean value' ).isBoolean(),
    validateFields
], updateAttributeGroup );

router.delete( ':id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( attributeGroupByIdExists ),
    check( 'id' ).custom( isAttributeGroupCreatedByUser ),
    validateFields
], deleteAttributeGroup );



module.exports = router;