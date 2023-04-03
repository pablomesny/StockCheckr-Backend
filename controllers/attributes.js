const { request, response } = require('express');
const Attribute = require('../models/attribute');

const getAttributes = async( req = request, res = response ) => {

    const { groupId } = req.params;
    const { from = 0, limit = 5 } = req.query;

    try {
        
        const { count, rows } = await Attribute.findAndCountAll({ where: { group: id }, limit, offset: from });

        res.json({
            ok: true,
            total: count,
            attributes: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving attributes list'
        })
    }
}

const createAttribute = async( req = request, res = response ) => {

    const { groupId: id } = req.params;
    const { name } = req.body;

    try {
        
        const attribute = await Attribute.build({ name, group: id });
        await attribute.save();

        res.status(201).json({
            ok: true,
            attribute
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating attribute'
        })
    }

}

module.exports = {
    getAttributes,
    createAttribute
}