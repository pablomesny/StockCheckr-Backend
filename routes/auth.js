const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const generateJWT = require('../helpers/generate-jwt');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.post( '/', [
    generateJWT,
    check( 'email', 'Email is mandatory' ).not().isEmpty(),
    check( 'password', 'Password is mandatory' ).not().isEmpty(),
    validateFields
], login );

module.exports = router;