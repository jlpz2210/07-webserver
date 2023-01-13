const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        this.dbConect();
        
        this.middlewares();

        this.routes();
    }
    
    async dbConect(){
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        
        this.app.use(this.usersPath, require('../routes/users'));

    };

    listen(){
        this.app.listen(this.port);
    }

}

module.exports = Server;