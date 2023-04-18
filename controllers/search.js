const { request } = require("express");
const { AttributeGroup, Brand, Category, Group, Product } = require("../models");

const permittedCollections = [ 'attributegroup', 'brand', 'category', 'group', 'product' ];

const search = ( req = request, res = response ) => {

    const { collection, term } = req.params;

    if( !permittedCollections.includes(collection) ) {
        return res.status(400).json({
            ok: false,
            msg: `Permitted collections are ${ permittedCollections }`
        })
    }

    switch( collection ) {
        case 'attributegroup':
            searchAttributeGroup( term, res );
            break;

        case 'brand':
            searchBrand( term, res );
            break;

        case 'category':
            searchCategory( term, res );
            break;

        case 'group':
            searchGroup( term, res );
            break;
            
        case 'product':
            searchProduct( term, res );
            break;

        default:
            res.status(500).json({
                ok: false,
                msg: 'Search not implemented'
            })
    }
}

const searchAttributeGroup = async( term, res = response ) => {

    try {
        const results = await AttributeGroup.findAll({ where: { name: term } });

        res.json({
            ok: true,
            result: results ? results : []
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while searching attribute group'
        })
    }
}

const searchBrand = async( term, res = response ) => {

    try {
        const results = await Brand.findAll({ where: { name: term } });

        res.json({
            ok: true,
            result: results ? results : []
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while searching brand'
        })
    }
}

const searchCategory = async( term, res = response ) => {

    try {
        const results = await Category.findAll({ where: { name: term } });

        res.json({
            ok: true,
            result: results ? results : []
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while searching category'
        })
    }
}

const searchGroup = async( term, res = response ) => {

    try {
        const results = await Group.findAll({ where: { name: term } });

        res.json({
            ok: true,
            result: results ? results : []
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while searching group'
        })
    }
}

const searchProduct = async( term, res = response ) => {

    try {
        const results = await Product.findAll({ where: { name: term } });

        res.json({
            ok: true,
            result: results ? results : []
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while searching product'
        })
    }
}


module.exports = {
    search
}