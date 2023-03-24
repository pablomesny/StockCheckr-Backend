const { Router } = require('express');
const { check } = require('express-validator');
const { createGroup, getGroups, updateGroupState } = require('../controllers/groups');
const { groupExists, groupByIdExists } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.get( '/', getGroups );

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
    check( 'state', 'State is mandatory' ).not().isEmpty(),
    check( 'state', 'State can only be setted to a boolean value' ).isBoolean(),
    validateFields
], updateGroupState);

module.exports = router;