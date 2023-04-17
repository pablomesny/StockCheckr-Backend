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


module.exports = {
    getSalesGroups
}