const { request, response } = require("express");
const SalesGroup = require("../models/salesGroup");

const getSalesGroups = async( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;

    try {
        const { count, rows } = await SalesGroup.findAndCountAll({ limit, offset: from });

        res.json({
            ok: true,
            total: count,
            salesGroups: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving sales groups'
        })
    }
}

const createSalesGroup = async( req = request, res = response ) => {

    const { id } = req.user;
    const { sales, totalPrice } = req.body;

    try {
        const salesGroup = await SalesGroup.build({ sales, totalPrice, created_by: id });
        await salesGroup.save();

        res.status(201).json({
            ok: true,
            salesGroup
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating sales group'
        })
    }

}


module.exports = {
    getSalesGroups,
    createSalesGroup
}