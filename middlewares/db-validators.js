const { User } = require('../models');
const Brand = require('../models/brand');
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

const isGroupCreatedByUser = async( id = '', { req } ) => {
    const { id: uid } = req.user;

    const group = await Group.findByPk( id );

    if( uid !== group.created_by ) {
        throw new Error( 'Group was not created by that user' );
    }
}

const brandExists = async( name = '' ) => {
    const { id } = req.user;

    const brand = await Brand.findOne({ where: { name, created_by: id } });

    if( brand ) {
        throw new Error( 'Brand name already exists' );
    }
}

const brandByIdExists = async( id = '' ) => {
    const brand = await Brand.findOne({ where: { id }});

    if( !brand ) {
        throw new Error( 'Brand by ID does not exists' );
    }
}

const isBrandCreatedByUser = async( id = '', { req } ) => {
    const { id: uid } = req.user;

    const brand = await Brand.findByPk( id );

    if( uid !== brand.created_by ) {
        throw new Error( 'Brand was not created by that user' );
    }
}


module.exports = {
    brandExists,
    brandByIdExists,
    isBrandCreatedByUser,
    userByEmailDoesNotExists,
    groupExists,
    groupByIdExists,
    userByEmailExists,
    isGroupCreatedByUser
}