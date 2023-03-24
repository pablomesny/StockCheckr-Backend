const { User } = require('../models');
const Group = require('../models/group');

const userByEmailExists = async( email = "" ) => {
    const user = await User.findOne({ where: { email }});

    if( !user ) {
        throw new Error( 'User by email does not exist' );
    }
}

const groupExists = async( name = '' ) => {
    const group = await Group.findOne({ where: { name } });

    if( group ) {
        throw new Error( 'Group name already exists' );
    }
}



module.exports = {
    userByEmailExists,
    groupExists
}