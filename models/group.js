const { DataTypes } = require('sequelize');
const db = require('../database/connection');
const User = require('./user');

const Group = db.define(
    'Group',
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
);

Group.sync()
    .then(() => {
        console.log('Groups table (re)created successfully');
    })
    .catch(error => {
        console.log('Error creating Groups table', error);
    });

module.exports = Group;
