const { request, response } = require('express');
const Group = require('../models/group');

const createGroup = async( req = request, res = response ) => {
    const { name } = req.body;

    const { id } = req.user;

    try {
        const group = await Group.build({ name, created_by: id });

        await group.save();
        
        res.status(201).json({
            ok: true,
            group
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error creating new group'
        })
    }

}

const getGroups = async( req = request, res = response ) => {

    const { from = 0, limit = 5 } = req.query;

    try {
        const { count, rows } = await Group.findAndCountAll({ where: { state: true },limit, offset: from });
    
        res.json({
            ok: true,
            total: count,
            groups: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving groups'
        })
    }
}

const updateGroup = async( req = request, res = response ) => {
    const { id } = req.params;
    const { body } = req;

    const { name, state, ...rest } = body;

    for( const [ key, value ] of Object.entries({ ...body }) ){

        switch( key ) {
            case 'name':
                rest.name = value;
                break;

            case 'state':
                rest.state = value;
                break;
        }

    }

    try {
        await Group.update( rest, { where: { id } } );

        const group = await Group.findByPk( id );
    
        res.json({
            ok: true,
            group
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error updating group'
        })
    }
}

const deleteGroup = async( req = request, res = response ) => {

    const { id } = req.params;

    try {
        
        const group = await Group.findByPk( id );

        await group.destroy();

        res.json({
            ok: true,
            msg: `Group ${ group.name } destroyed successfully`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Error destroying group`
        })
    }
}



module.exports = {
    createGroup,
    getGroups,
    updateGroup,
    deleteGroup
}