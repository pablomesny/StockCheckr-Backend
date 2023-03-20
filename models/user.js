const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const User = db.define( 'User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: false
});

User.sync().then( () => {
    console.log('Users table created successfully');
}).catch( ( error ) => {
    console.log( 'Error creating Users table', error );
})

module.exports = User;