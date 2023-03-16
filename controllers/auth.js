const { request, response } = require("express");

const login = ( req = request, res = response ) => {
    console.log('login post');
}


module.exports = {
    login
}