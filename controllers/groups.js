const { request, response } = require('express');
const Group = require('../models/group');

const createGroup = async( req = request, res = response ) => {
    const { name } = req.body;

    const { id } = req.user;

    try {
        const group = await Group.build({ name, created_by: id });

        await group.save();
        
        res.status(201).json({
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

    const { count, rows } = await Group.findAndCountAll({ where: { state: true },limit, offset: from });

    res.json({
        total: count,
        groups: rows
    })
}



module.exports = {
    createGroup,
    getGroups
}