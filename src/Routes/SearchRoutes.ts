import { Router, Request, Response } from 'express';
import SearchController from '../Controller/Search';

class SearchRouter {
    public router: Router;
    constructor() { 
        this.router = Router();
        this.routes();
    }

    public selectsSearch( req: Request, res: Response ): Response | void {
        const allowedCollections: string[] = ['users', 'categories', 'products', 'roles'] ;
        const { collection, term } = req.params;
    
        if( !allowedCollections.includes( collection ) ) {
            return res.status(400).json({
                ok: false,
                message: `The allowed collections are: ${ allowedCollections }`
            });
        }
    
        switch( collection ) {
            case 'users':
                SearchController.searchUser( term, res );
                break;
            case 'categories':
                SearchController.searchCategory( term, res );
                break;
            case 'products':
                SearchController.searchProduct( term, res );
                break;
            default: 
                return res.status(500).json({ 
                    ok: false, 
                    message: `We couldn't search the collection: ${ term }`
                });
        }
    }
    /*
        *
        * /api/buscar/:colección/:termino
        *    
    */
    routes() {
        this.router.get( '/:collection/:term', this.selectsSearch );
    }
}

const searchRoutes = new SearchRouter();
export default searchRoutes.router;