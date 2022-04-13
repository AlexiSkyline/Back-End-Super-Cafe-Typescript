import { Router } from 'express';
import { check } from 'express-validator';

import ProductController from '../Controller/Products';
import ValidateInput from '../Middlewares/ValidateInput';
import DBValidator from '../Helpers/DBValidator';

class ProductsRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        // ? Get all Products - Public
        this.router.get( '/', ProductController.getProducts );

        // ? Get Product by ID - Public
        this.router.get( '/:id' );

        // ? Create Product - Private - Anyone with a valid token
        this.router.post( '/', 
            [
                ValidateInput.validateJWT,
                check( 'name', 'The name is riquired' ).not().isEmpty(),
                check( 'category', 'The Category is invalid' ).isMongoId(),
                check( 'category' ).custom( DBValidator.findCategoryById ),
                ValidateInput.validateFields,
            ],
            ProductController.createProduct 
        );

        // ? Update Product - Private - Anyone with a valid token
        this.router.put( '/:id' );

        // ? Delete Product - Only with Administrator Permission
        this.router.delete( '/:id' );
    }
}

const productRoutes = new ProductsRoutes();
export default productRoutes.router;