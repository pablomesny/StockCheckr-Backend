const { Router } = require('express');
const { check } = require('express-validator');
const { getAttributes, createAttribute, updateAttribute, deleteAttribute } = require('../controllers/attributes');
const { attributeGroupByIdExists, attributeByIdExists, userByIdExists, isAttributeCreatedByUser } = require('../middlewares/db-validators');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.get( '/:userId/:groupId', [
    check( 'groupId', 'Group ID is mandatory' ).not().isEmpty(),
    check( 'groupId' ).custom( attributeGroupByIdExists ),
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getAttributes );

router.post( '/:groupId', [
    validateJWT,
    check( 'groupId', 'Group ID is mandatory' ).not().isEmpty(),
    check( 'groupId' ).custom( attributeGroupByIdExists ),
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    validateFields
], createAttribute );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( attributeByIdExists ),
    check( 'id' ).custom( isAttributeCreatedByUser ),
    validateFields
], updateAttribute );

router.delete( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( attributeByIdExists ),
    check( 'id' ).custom( isAttributeCreatedByUser ),
    validateFields
], deleteAttribute );


module.exports = router;