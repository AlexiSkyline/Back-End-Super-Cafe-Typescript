import { Router } from 'express';
import CategoryController from '../Controller/Category';

class CategoryRoutes {
    public router: Router;
    constructor() {
        this.router = Router();

        this.routes();
    }

    routes() {
        // ? Get all categories - public
        this.router.get( '/', CategoryController.getCategories );

        // ? Get category by ID - public
        this.router.get( '/:id' );

        // ? Create category - Private - Anyone with a valid token
        this.router.post( '/' );

        // ? Update category - Private - Anyone with a valid token
        this.router.put( '/:id' );

        // ? Delete category - Only with administrator permission
        this.router.delete( '/:id' );
    }
}

const categoryRoutes =  new CategoryRoutes();
export default categoryRoutes.router;