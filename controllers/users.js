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
        user
    })
}


module.exports = {
    createUser
}