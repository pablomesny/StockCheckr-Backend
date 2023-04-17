const { request, response } = require("express");
const { Product } = require("../models");

const getProducts = async( req = request, res = response ) => {

    const { userId: id } = req.params;
    const { from = 0, limit = 5 } = req.query;

    try {
        
        const { count, rows } = await Product.findAndCountAll({ where: { created_by: id }, limit, offset: from });

        res.json({
            ok: true,
            total: count,
            products: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving products'
        })
    }

}

const createProduct = async( req = request, res = response ) => {

    const { name, price, group, brand, category, attribute, stock } = req.body;
    const { id } = req.user;

    try {
        
        const product = await Product.build({ name, price, group, brand, category, attribute, stock, created_by: id });

        await product.save();

        res.status(201).json({
            ok: true,
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error creating product'
        })
    }
}

const updateProduct = async( req = request, res = response ) => {

    const { id } = req.params;
    const { body } = req;
    const { name, price, group, brand, category, attribute, stock, ...rest } = body;

    for( const [ key, value ] of Object.entries({ ...body })) {
        switch (key) {
            case 'name':
                rest.name = value;
                break;        

            case 'price':
                rest.price = value;
                break;

            case 'group':
                rest.group = value;
                break;

            case 'brand':
                rest.brand = value;
                break;

            case 'category':
                rest.category = value;
                break;

            case 'attribute':
                rest.attribute = value;
                break;

            case 'stock':
                rest.stock = value;
                break;
        }
    }

    try {
        
        await Product.update( rest, { where: id });

        const product = await Product.findByPk( id );

        res.json({
            ok: true,
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error updating product'
        })
    }
}

const deleteProduct = ( req = request, res = response ) => {

}


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}