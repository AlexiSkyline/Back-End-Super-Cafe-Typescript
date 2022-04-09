import express, { Application } from 'express';
import cors from 'cors';

import dbConnection from '../Database/config';
import { ProductsRoutes, UserRoutes } from '../Routes/Index';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = { 
        product: '/api/products',
        user:    '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';

        // * Connect to database
        this.connectDB();

        // * Middlewares
        this.middlewares();

        // * Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // * Cors
        this.app.use( cors() );

        // * Reading and parsing of the body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.apiPaths.product, ProductsRoutes );
        this.app.use( this.apiPaths.user, UserRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Server on port', this.port );
        });
    }
}

export default Server;