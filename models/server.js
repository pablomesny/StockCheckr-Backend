const express = require('express');
const cors = require('cors');
const db = require('../database/connection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.routePaths = {
            auth: '/api/auth',
            users: '/api/users',
            groups: '/api/groups',
            brands: '/api/brands',
            attributeGroups: '/api/attributes/groups'
        };

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        
        try {
            await db.authenticate();
            console.log('DB Online');
        } catch (error) {
            throw new Error( error );
        }

    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.routePaths.auth, require('../routes/auth') );
        this.app.use( this.routePaths.users, require('../routes/users') );
        this.app.use( this.routePaths.groups, require('../routes/groups') );
        this.app.use( this.routePaths.brands, require('../routes/brands') );
        this.app.use( this.routePaths.attributeGroups, require('../routes/attributeGroups') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( `Server listening on port ${ this.port }` );
        })
    }

}

module.exports = Server;