const { DataTypes } = require("sequelize");
const db = require("../database/connection");

const Group = db.define( 'Group', {
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
            model: 'User',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Group.sync()
    .then( () => {
        console.log( 'Groups table created successfully' );
    })
    .catch( error => {
        console.log( 'Error creating Groups table', error );
    });

module.exports = Group;