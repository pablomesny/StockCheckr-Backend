const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const User = require("./user");

const AttributeGroup = db.define(
    'Attribute Group', {
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


module.exports = AttributeGroup;