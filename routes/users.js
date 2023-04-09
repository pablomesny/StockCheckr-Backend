const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, updateUser } = require('../controllers/users');
const { userByEmailExists, isUserCreatedByTheSameUser } = require('../middlewares/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.post( '/', [
    check( 'username', 'Username is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is not valid' ).isEmail(),
    check( 'email' ).custom( userByEmailExists ),
    check( 'password', 'Password is mandatory' ).not().isEmpty(),
    check( 'password', 'Password should have at least 8 characters' ).isLength({ min: 8 }),
    validateFields
], createUser );

router.put( '/:id', [
    validateJWT,
    check( 'id', 'ID is mandatory' ).not().isEmpty(),
    check( 'id' ).custom( userByEmailExists ),
    check( 'id' ).custom( isUserCreatedByTheSameUser ),
    validateFields
], updateUser );


module.exports = router;