const { request, response } = require("express");
const bcrypt = require('bcrypt');
const { User } = require("../models");
const generateJWT = require("../helpers/generate-jwt");

const login = async( req = request, res = response ) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if( !user ) {
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect email or password'
        })
    }

    if( !user.state ) {
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect email or password'
        })
    }

    const validPassword = bcrypt.compareSync( password, user.password );

    if( !validPassword ){
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect user or password'
        })
    }

    const token = await generateJWT( user.id );

    res.json({
        ok: true,
        user,
        token
    })
}


module.exports = {
    login
}