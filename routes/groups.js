const { Router } = require('express');
const { check } = require('express-validator');
const { createGroup, getGroups, updateGroup, deleteGroup } = require('../controllers/groups');
const { groupExists, groupByIdExists, isGroupCreatedByUser, userByIdExists } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'User ID is mandatory' ).not().isEmpty(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getGroups );

router.post( '/', [
    validateJWT,
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    check( 'name' ).custom( groupExists ),
    validateFields
], createGroup);

router.put( '/:id', [
    validateJWT,
    check( 'id', 'Group ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( groupByIdExists ),
    check( 'id' ).custom( isGroupCreatedByUser ),
    validateFields
], updateGroup);

router.delete( '/:id', [
    validateJWT,
    check( 'id' ).not().isEmpty(),
    check( 'id' ).custom( groupByIdExists ),
    check( 'id' ).custom( isGroupCreatedByUser ),
    validateFields
], deleteGroup);

module.exports = router;