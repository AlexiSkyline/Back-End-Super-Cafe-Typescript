import { Router } from 'express';

class SearchRouter {
    public router: Router;
    constructor() { 
        this.router = Router();
        this.routes();
    }

    /*
        *
        * /api/buscar/:colección/:termino
        *    
    */
    routes() {
        this.router.get( '/:collection/:term' );
    }
}

const searchRoutes = new SearchRouter();
export default searchRoutes.router;