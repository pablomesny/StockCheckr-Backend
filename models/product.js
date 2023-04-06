const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const Group = require("./group");
const Brand = require("./brand");
const Category = require("./category");
const Attribute = require("./attribute");
const User = require("./user");

const Product = db.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        barcode: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sale_price: {
            type: DataTypes.INTEGER,
        },
        group: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Group,
                key: 'id'
            }
        },
        brand: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Brand,
                key: 'id'
            }
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
        attribute: {
            type: DataTypes.INTEGER,
            references: {
                model: Attribute,
                key: 'id'
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: [ 'name', 'created_by' ]
            }
        ]
    }
)

Product.sync()
    .then( () => {
        console.log('Products table (re)created successfully');
    })
    .catch( (error) => {
        console.log('Error creating products table', error);
    })

module.exports = Product;