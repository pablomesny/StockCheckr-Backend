const { DataTypes } = require('sequelize');
const db = require("../database/connection");
const Sale = require('./sale');
const User = require('./user');

const SalesGroup = db.define( 'Sales Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sales: {
        type: DataTypes.ARRAY,
        allowNull: false,
        references: {
            model: Sale,
            key: 'id'
        }
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
})

SalesGroup.sync()
    .then( () => {
        console.log( 'Sales Group table (re)created successfully' );
    })
    .catch( error => {
        console.log( 'Error while creating Sales Group table', error );
    })

module.exports = SalesGroup;