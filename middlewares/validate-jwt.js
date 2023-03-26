const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateJWT = async( req = request, res = response, next ) => {
    const token = req.header( 'x-token' );

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findByPk( uid );

        if( !user ) {
            return res.status(401).json({
                ok: false,
                msg: 'Token is not valid'
            })
        }

        if( !user.state ) {
            return res.status(401).json({
                ok: false,
                msg: 'Token is not valid'
            })
        }

        req.user = user;
        
        next();

    } catch (error) {
        console.log( error );
        res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        })
    }
}

module.exports = validateJWT;