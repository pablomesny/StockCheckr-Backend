const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const Product = require("./product");
const User = require("./user");

const Sale = db.define( 'Sale', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Sale.sync()
    .then( () => {
        console.log( 'Sales table (re)created successfully');
    })
    .catch( error => {
        console.log ( 'Error creating sales table', error );
    })

module.exports = Sale;