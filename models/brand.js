const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const User = require("./user");

const Brand = db.define(
    'Brand',
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
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: [ 'name', 'created_by' ]
            }
        ]
});

Brand.sync()
    .then( () => {
        console.log( 'Brands table (re)created successfully' );
    })
    .catch( error => {
        console.log( 'Error creating brands table', error );
    })

module.exports = Brand;