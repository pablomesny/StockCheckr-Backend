const { Router } = require('express');
const { getAttributeGroups, createAttributeGroup, updateAttributeGroup, deleteAttributeGroup } = require('../controllers/attributeGroups');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { attributeGroupExists, attributeGroupByIdExists, isAttributeGroupCreatedByUser, userByIdExists } = require('../middlewares/db-validators');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getAttributeGroups );

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