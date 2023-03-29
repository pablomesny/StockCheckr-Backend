const { User } = require('../models');
const Group = require('../models/group');

const userByEmailDoesNotExists = async( email = "" ) => {
    const user = await User.findOne({ where: { email }});

    if( !user ) {
        throw new Error( 'User by email does not exist' );
    }
}

const groupExists = async( name = '', { req } ) => {
    const { id } = req.user;
    const group = await Group.findOne({ where: { name, created_by: id } });

    if( group ) {
        throw new Error( 'Group name already exists' );
    }
}

const groupByIdExists = async( id = '' ) => {
    const group = await Group.findByPk( id );

    if( !group ) {
        throw new Error( 'Group by ID does not exists' );
    }
}

const userByEmailExists = async( email = '' ) => {
    const user = await User.findOne({ where: { email } });

    if( user ) {
        throw new Error( 'Email is already in use' );
    }
}


module.exports = {
    userByEmailDoesNotExists,
    groupExists,
    groupByIdExists,
    userByEmailExists
}