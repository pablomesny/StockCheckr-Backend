const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const AttributeGroup = require("./attributeGroup");

// TODO: add index for created_by in AttributeGroup
const Attribute = db.define(
    'Attribute',
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
        group: {
            type: DataTypes.INTEGER,
            references: {
                model: AttributeGroup,
                key: 'id'
            }
        }
    }
);

module.exports = Attribute;