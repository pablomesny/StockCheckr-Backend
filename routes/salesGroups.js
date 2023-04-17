const { Router } = require('express');
const { getSalesGroups } = require('../controllers/salesGroups');

const router = new Router();

router.get( '/', getSalesGroups );


module.exports = router;