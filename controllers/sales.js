const { request, response } = require("express");
const Sale = require("../models/sale");

const getSales = async( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.body;

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

const createSale = async( req = request, res = response ) => {

    const { userId: id } = req.params;
    const { product, amount = 1 } = req.body;

    try {
        const sale = await Sale.build({ product, amount, client_id: id });

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
    createSale
}