const { request, response } = require('express');
const Attribute = require('../models/attribute');
const { Sequelize } = require('sequelize');

const getAttributes = async( req = request, res = response ) => {

    const { groupId, userId } = req.params;
    const { from = 0, limit = 5 } = req.query;

    try {
        
        const { count, rows } = await Attribute.findAndCountAll({ 
            where: { 
                group: {
                    [Op.in]: Sequelize.literal(
                        `(SELECT id FROM "Attribute Groups" WHERE created_by = ${userId} AND id = ${groupId})`
                    )
                } 
            }, limit, offset: from });

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

const updateAttribute = async( req = request, res = response ) => {

    const { body } = req;
    const { id } = req.params;

    const { name, state, ...rest } = body;

    for( const [ key, value ] of Object.entries({ ...body })) {
        switch (key) {
            case 'name':
                rest.name = value;
                break;

            case 'state':
                rest.state = value;
                break;
        
            default:
                break;
        }
    }

    try {
        
        await Attribute.update( rest, { where: id });

        const attribute = await Attribute.findByPk( id );

        res.json({
            ok: true,
            attribute
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while updating attribute'
        })
    }
}

const deleteAttribute = async( req = request, res = response ) => {

    const { id } = req.params;

    try {
        
        const attribute = await Attribute.findByPk( id );
        attribute.destroy();

        res.json({
            ok: true,
            msg: `Attribute ${ attribute.name } destroyed successfully`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while destroying attribute'
        })
    }
}

module.exports = {
    getAttributes,
    createAttribute,
    updateAttribute,
    deleteAttribute
}