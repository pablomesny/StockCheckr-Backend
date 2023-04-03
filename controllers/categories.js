const { request, response } = require('express');
const { Category } = require('../models');

const getCategories = async( req = request, res = response ) => {

    const { from = 0, limit = 5 } = req.query;

    try {
        
        const { count, rows } = await Category.findAndCountAll({ where: { state: true }, limit, offset: from });

        res.json({
            ok: true,
            total: count,
            categories: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving categories'
        })
    }
}


module.exports = {
    getCategories
}