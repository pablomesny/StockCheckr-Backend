const { request, response } = require("express");
const Sale = require("../models/sale");
const { Product } = require("../models");

const getSales = async( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;

    try {
        const { count, rows } = await Sale.findAndCountAll({ limit, offset: from });
        
        res.json({
            ok: true,
            total: count,
            sales: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving sales'
        })
    }
}

const getSalesByUserId = async( req = request, res = response ) => {

    const { userId } = req.params;
    const { limit = 5, from = 0 } = req.query;

    try {
        const { count, rows } = await Sale.findAndCountAll({ where: { created_by: userId }, limit, offset: from });

        res.json({
            ok: true,
            total: count,
            sales: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving sales by User ID'
        })
    }
}

const getSaleById = async( req = request, res = response ) => {
    const { id } = req.params;

    try {
        const sale = await Sale.findByPk( id );

        res.json({
            ok: true,
            sale
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving sale by ID'
        })
    }
}

const createSale = async( req = request, res = response ) => {

    const { id } = req.user;
    const { product: productId, amount, price } = req.body;

    try {
        const sale = await Sale.build({ product: productId, amount, price, created_by: id });
        const product = await Product.findByPk( productId );

        if( product.stock < amount ) {
            return res.status(400).json({
                ok: false,
                msg: 'Insufficient stock'
            })
        }

        const productStock = product.stock - amount;
        const state = productStock > 0;

        await Product.update({ stock: productStock, state }, { where: productId });
        await sale.save();

        res.status(201).json({
            ok: true,
            sale
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating sale'
        })
    }
}

const updateSale = async( req = request, res = response ) => {
    const { body } = req;
    const { id } = req.params;

    const { product, amount, price, ...rest } = body;

    for( const [ key, value ] of Object.entries({ ...body })) {
        switch (key) {
            case 'product':
                rest.product = value;
                break;
                
            case 'amount':
                rest.amount = value;
                break;

            case 'price':
                rest.price = value;
                break;
        }
    }

    try {
        await Sale.update( rest, { where: { id } });

        const sale = await Sale.findByPk( id );

        res.json({
            ok: true,
            sale
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error updating sale'
        })
    }
}

const deleteSale = async( req = request, res = response ) => {

    const { id } = req.params;

    try {
        const sale = await Sale.findByPk( id );
        await sale.destroy();

        res.json({
            ok: true,
            msg: `Sale ID: ${ id } destroyed succesfully`
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error destroying sale'
        })
    }
}

module.exports = {
    getSales,
    getSalesByUserId,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
}