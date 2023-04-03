const { request, response } = require('express');
const { AttributeGroup } = require('../models');

const getAttributeGroups = async( req = request, res = response ) => {

    const { userId } = req.params;
    const { from = 0, limit = 5 } = req.query;

    try {
        const { count, rows } = await AttributeGroup.findAndCountAll({ where: { created_by: userId }, limit, offset: from });
        
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

const createAttributeGroup = async( req = request, res = response ) => {

    const { name } = req.body;
    const { id } = req.user

    try {
        
        const attributeGroup = await AttributeGroup.build({ name, created_by: id });

        await attributeGroup.save();

        res.status(201).json({
            ok: true,
            attributeGroup
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating attribute group'
        })
    }
}

const updateAttributeGroup = async( req = request, res = response ) => {

    const { id } = req.params;
    const { body } = req;

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
        await AttributeGroup.update( rest, { where: id } );

        const attributeGroup = await AttributeGroup.findByPk( id );

        res.json({
            ok: true,
            attributeGroup
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error updating attribute group'
        })
    }
}

const deleteAttributeGroup = async( req = request, res = response ) => {

    const { id } = req.params;

    try {
        const attributeGroup = await AttributeGroup.findByPk( id );
        
        await attributeGroup.destroy();

        res.json({
            ok: true,
            msg: `Attribute group ${ attributeGroup.name } destroyed successfully`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error destroying attribute group'
        })
    }
}



module.exports = {
    getAttributeGroups,
    createAttributeGroup,
    updateAttributeGroup,
    deleteAttributeGroup
}