import express, { Application } from 'express';
import cors from 'cors';

import dbConnection from '../Database/config';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';

        // * Conectar a base de datos
        this.connectDB();

        // * Middlewares
        this.middlewares();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // * Cors
        this.app.use( cors() );

        // * Lectura y parseo del body
        this.app.use( express.json() );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Server on port', this.port );
        });
    }
}

export default Server;