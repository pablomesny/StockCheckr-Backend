const { Router } = require('express');
const { getAttributeGroups } = require('../controllers/attributeGroups');

const router = new Router();

router.get( '/', getAttributeGroups );



module.exports = router;