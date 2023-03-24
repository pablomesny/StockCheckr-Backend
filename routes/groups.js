const { Router } = require('express');
const { check } = require('express-validator');
const { createGroup, getGroups } = require('../controllers/groups');
const { groupExists } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.post( '/', [
    validateJWT,
    check( 'name', 'Name is mandatory' ).not().isEmpty(),
    check( 'name' ).custom( groupExists ),
    validateFields
], createGroup);

router.get( '/', getGroups );


module.exports = router;