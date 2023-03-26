const { Router } = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/users');
const { userByEmailExists } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.post( '/', [
    check( 'username', 'Username is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is not valid' ).isEmail(),
    check( 'email' ).custom( userByEmailExists ),
    check( 'password', 'Password is mandatory' ).not().isEmpty(),
    check( 'password', 'Password should have at least 8 characters' ).isLength({ min: 8 }),
    validateFields
], createUser);


module.exports = router;