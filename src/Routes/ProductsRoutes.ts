import { Router } from 'express';

import ProductController from '../Controller/Products';

class ProductsRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        // ? Get all Products - Public
        this.router.get( '/', ProductController.GetProducts );

        // ? Get Product by ID - Public
        this.router.get( '/:id' );

        // ? Create Product - Private - Anyone with a valid token
        this.router.post( '/', ProductController.CreateProduct );

        // ? Update Product - Private - Anyone with a valid token
        this.router.put( '/:id' );

        // ? Delete Product - Only with Administrator Permission
        this.router.delete( '/:id' );
    }
}

const productRoutes = new ProductsRoutes();
export default productRoutes.router;