const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { userByEmailDoesNotExists } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.post( '/', [
    check( 'email' ).custom( userByEmailDoesNotExists ),
    check( 'email', 'Email is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is not valid' ).isEmail(),
    check( 'password', 'Password is mandatory' ).not().isEmpty(),
    validateFields
], login );

module.exports = router;