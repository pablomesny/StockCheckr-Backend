const { Router } = require('express');
const { check } = require('express-validator');
const { getAttributes, createAttribute, updateAttribute, deleteAttribute } = require('../controllers/attributes');
const { attributeGroupByIdExists, attributeByIdExists, userByIdExists } = require('../middlewares/db-validators');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.get( '/:userId/:groupId', [
    check( 'groupId', 'Group ID is mandatory' ).not().isEmpty(),
    check( 'groupId' ).custom( attributeGroupByIdExists ),
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
], getAttributes );

router.post( '/:groupId', [
    validateJWT,
    check( 'groupId', 'Group ID is mandatory' ).not().isEmpty(),
    check( 'groupId' ).custom( attributeGroupByIdExists ),
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    validateFields
], createAttribute );

// TODO: isAttributeCreatedByUser custom check
router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( attributeByIdExists ),
    check( 'id' ).custom(),
    validateFields
], updateAttribute );

// TODO: isAttributeCreatedByUser custom check
router.delete( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( attributeByIdExists ),
    check( 'id' ).custom(),
    validateFields
], deleteAttribute );


module.exports = router;