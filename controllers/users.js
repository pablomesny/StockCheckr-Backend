const { request, response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const createUser = async( req = request, res = response ) => {
    const { email, username, password } = req.body;

    const user = User.build({ email, username, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    res.status(201).json({
        ok: true,
        user
    })
}

const updateUser = async( req = request, res = response ) => {

    const { body } = req;
    const { id } = req.params;
    const { id: uid } = req.user;

    const { username, email, password, ...rest } = body;

    for( const [ key, value ] of Object.entries({ ...body }) ) {

        switch (key) {
            case 'username':
                rest.username = value;
                break;

            case 'email':
                rest.email = value;
                break;

            case 'password':
                const salt = bcrypt.genSaltSync();
                rest.password = bcrypt.hashSync( value, salt );
                break;
        }
    }

    try {
        
        await User.update( rest, { where: { id } } );

        const user = await User.findByPk( id );

        res.json({
            ok: true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error updating user'
        })
    }
}

module.exports = {
    createUser,
    updateUser
}