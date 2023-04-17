const { User, AttributeGroup, Group, Brand, Attribute, Category, Product } = require('../models');
const Sale = require('../models/sale');

const userByEmailDoesNotExists = async( email = "" ) => {
    const user = await User.findOne({ where: { email }});

    if( !user ) {
        throw new Error( 'User by email does not exist' );
    }
}

const userByIdExists = async( id = '' ) => {
    const user = await User.findByPk( id );

    if( !user || !user.state ) {
        throw new Error( 'User by ID does not exists' );
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

const isUserCreatedByTheSameUser = async( id, { req } ) => {
    const { id: uid } = req.user;

    if( id !== uid ) {
        throw new Error( 'You can only modify your account' );
    }
}

const isGroupCreatedByUser = async( id = '', { req } ) => {
    const { id: uid } = req.user;

    const group = await Group.findByPk( id );

    if( uid !== group.created_by ) {
        throw new Error( 'Group was not created by that user' );
    }
}

const brandExists = async( name = '', { req } ) => {
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
const attributeGroupExists = async( name = '', { req } ) => {
    const { id } = req.user;

    const attributeGroup = await AttributeGroup.findOne({ where: { name, created_by: id }});

    if( attributeGroup ) {
        throw new Error( 'Attribute group name already exists' );
    }
}

const attributeGroupByIdExists = async( id = '' ) => {
    const attributeGroup = await AttributeGroup.findByPk( id );

    if( !attributeGroup ) {
        throw new Error( 'Attribute group by ID does not exists' );
    }
}

const isAttributeGroupCreatedByUser = async( id = '', { req } ) => {
    const { id: uid } = req.user;

    const attributeGroup = await AttributeGroup.findByPk( id );

    if( uid !== attributeGroup.created_by ) {
        throw new Error( 'Attribute group was not created by that user' );
    }
}

const attributeByIdExists = async( id = '' ) => {
    const attribute = await Attribute.findByPk( id );

    if( !attribute ) {
        throw new Error( 'Attribute by ID does not exists' );
    }
}

// TODO: created_by from attributegroup
const isAttributeCreatedByUser = async( id = '', { req } ) => {
    const { id: uid } = req.user;

    const attribute = await Attribute.findOne({ where: { id }})
    const attributeGroup = await AttributeGroup.findByPk( attribute.group );

    if( uid !== attributeGroup.created_by ) {
        throw new Error( 'Attribute was not created by that user' );
    }
}

const categoryExists = async( name = '' ) => {
    const category = await Category.findOne({ where: { name }});

    if( category ) {
        throw new Error( 'Category name already exists' );
    }
}

const categoryByIdExists = async( id = '' ) => {
    const category = await Category.findByPk( id );

    if( !category ) {
        throw new Error( 'Category by ID does not exists' );
    }
}

const isCategoryCreatedByUser = async( id = '', { req } ) => {

    const { id: uid } = req.user;

    const category = await Category.findByPk( id );

    if( uid !== category.created_by ) {
        throw new Error( 'Category was not created by that user' );
    }
}

const productExists = async( name = '', { req } ) => {
    const { id } = req.user;
    const product = await Product.findOne({ where: { name, created_by: id } });

    if( product ) {
        throw new Error( 'Product name already exists' );
    }
}

const productByIdExists = async( id = '' ) => {
    const product = await Product.findByPk( id );

    if( !product ) {
        throw new Error ( 'Product by ID does not exists' );
    }
}

const isProductCreatedByUser = async( id = '', { req } ) => {
    const { id: uid } = req.user;

    const product = await Product.findByPk( id );

    if( product.created_by !== uid ) {
        throw new Error( 'Product was not created by that user' );
    }
}

const productsByBrandExist = async( id = '' ) => {
    const products = await Product.findAll({ where: { brand: id } });

    if( !products ) {
        throw new Error( 'No product exists with that brand' );
    }
}

const productsByCategoryExist = async( id = '' ) => {
    const products = await Product.findAll({ where: { category: id } });

    if( !products ) {
        throw new Error( 'No product exists with that category' );
    }
}

const saleByIdExists = async( id = '' ) => {
    const sale = await Sale.findByPk( id );

    if( !sale ) {
        throw new Error ( 'Sale by ID does not exists' );
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
    isGroupCreatedByUser,
    attributeGroupExists,
    attributeGroupByIdExists,
    isAttributeGroupCreatedByUser,
    attributeByIdExists,
    isAttributeCreatedByUser,
    userByIdExists,
    isUserCreatedByTheSameUser,
    categoryExists,
    categoryByIdExists,
    isCategoryCreatedByUser,
    productExists,
    productByIdExists,
    isProductCreatedByUser,
    productsByBrandExist,
    productsByCategoryExist,
    saleByIdExists
}