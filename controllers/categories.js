const { request, response } = require('express');
const { Category } = require('../models');

const getCategories = async( req = request, res = response ) => {

    const { userId: id } = req.params;
    const { from = 0, limit = 5 } = req.query;

    try {
        
        const { count, rows } = await Category.findAndCountAll({ where: { created_by: id }, limit, offset: from });

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

const createCategory = async( req = request, res = response ) => {

    const { name } = req.body;
    const { id } = req.user;

    try {
        
        const category = await Category.build({ name, created_by: id });

        await category.save();

        res.status(201).json({
            ok: true,
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating category'
        })
    }
}


module.exports = {
    getCategories,
    createCategory
}