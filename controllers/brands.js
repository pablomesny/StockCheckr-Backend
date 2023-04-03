const { request, response } = require('express');
const Brand = require('../models/brand');

const getBrands = async( req = request, res = response ) => {
    
    const { limit = 5, from = 0 } = req.query;

    try {
        const { count, rows } = await Brand.findAndCountAll({ where: { state: true }, limit, offset: from });

        res.json({
            ok: true,
            total: count,
            brands: rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving groups'
        })
    }

}

const createBrand = async( req = request, res = response ) => {
    const { name } = req.body;
    const { id } = req.user;

    try {
        const brand = await Brand.build({ name, created_by: id });

        await brand.save();

        res.status(201).json({
            ok: true,
            brand
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error creating brand'
        })
    }
}

const updateBrand = async( req = request, res = response ) => {
    const { id } = req.params;
    const { body } = req;

    const { name, state, ...rest } = body;

    for( const [ key, value ] of Object.entries({ ...body }) ) {
        switch (key) {
            case 'name':
                rest.name = value;
                break;
        
            case 'state':
                rest.state = value;
                break;   
        }
    }

    try {
        await Brand.update( rest, { where: { id } } );

        const brand = await Brand.findByPk( id );

        res.json({
            ok: true,
            brand
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error updating brand'
        })
    }
}

const deleteBrand = async( req = request, res = response ) => {
    const { id } = req.params;

    try {
        const brand = await Brand.findByPk( id );

        await brand.destroy();

        res.json({
            ok: true,
            msg: `Brand ${ brand.name } destroyed successfully`
        })

    } catch (error) {
        console.log(error);        
        res.status(500).json({
            ok: false,
            msg: 'Error destroying brand'
        })
    }
}


module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
}