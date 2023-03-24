const { Router } = require('express');
const { check } = require('express-validator');
const { createGroup } = require('../controllers/groups');

const router = new Router();

router.post( '/', [

], createGroup);


module.exports = router;