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

    const { userId: id } = req.params;
    const { product: productId, amount = 1 } = req.body;

    try {
        const sale = await Sale.build({ product: productId, amount, created_by: id });
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

module.exports = {
    getSales,
    getSalesByUserId,
    getSaleById,
    createSale
}