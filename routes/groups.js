const { Router } = require('express');
const { check } = require('express-validator');
const { createGroup } = require('../controllers/groups');
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


module.exports = router;