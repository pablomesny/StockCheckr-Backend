const { request, response } = require('express');

const createGroup = ( req = request, res = response ) => {
    res.json({
        msg: 'Group created'
    })
}



module.exports = {
    createGroup
}