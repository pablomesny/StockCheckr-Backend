const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const AttributeGroup = require("./attributeGroup");

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
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: [ 'name', 'group' ]
            }
        ]
    }
);

Attribute.sync()
    .then( () => {
        console.log( 'Attributes table (re)created successfully' );
    })
    .catch( error => {
        console.log( 'Error creating attributes table', error );
    })

module.exports = Attribute;