const { request, response } = require('express');
const AttributeGroup = require('../models/AttributeGroup');

const getAttributeGroups = async( req = request, res = response ) => {

    const { from = 0, limit = 5 } = req.query;

    try {
        const { count, rows } = await AttributeGroup.findAndCountAll({ where: { state: true }, limit, offset: from });
        
        res.json({
            ok: true,
            total: count,
            attributeGroups: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving attribute groups'
        })
    }


}



module.exports = {
    getAttributeGroups
}