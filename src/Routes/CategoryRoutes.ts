import { Router } from 'express';
import { check } from 'express-validator';

import CategoryController from '../Controller/Category';
import DBValidator from '../Helpers/DBValidator';
import ValidateInput from '../Middlewares/ValidateInput';

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
        this.router.get( '/:id', 
            [
                check( 'id', 'ID is invalid' ).isMongoId(),
                check( 'id' ).custom( DBValidator.findCategoryById ),
                ValidateInput.validateFields
            ],
            CategoryController.getCategoryById
        );

        // ? Create category - Private - Anyone with a valid token
        this.router.post( '/',
            [
                ValidateInput.validateJWT,
                check( 'name', 'The name is required' ).not().isEmpty(),
                ValidateInput.validateFields
            ],
            CategoryController.createCategory
        );

        // ? Update category - Private - Anyone with a valid token
        this.router.put( '/:id', 
            [
                ValidateInput.validateJWT,
                check( 'name', 'The name is required' ).not().isEmpty(),
                check( 'id', 'The ID is invalid' ).isMongoId(),
                check( 'id' ).custom( DBValidator.findCategoryById ),
                ValidateInput.validateFields
            ],
            CategoryController.updateCategory
        );

        // ? Delete category - Only with administrator permission
        this.router.delete( '/:id' );
    }
}

const categoryRoutes =  new CategoryRoutes();
export default categoryRoutes.router;