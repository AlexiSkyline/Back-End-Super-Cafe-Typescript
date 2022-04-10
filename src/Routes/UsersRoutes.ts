import { Router } from 'express';
import { check } from 'express-validator';

import UsersController from '../Controller/Users';
import DBValidator from '../Helpers/DBValidator';
import ValidateInput from '../Middlewares/ValidateInput';
import ValidateRoles from '../Middlewares/ValidateRoles';

class UsersRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routers();
    }

    routers() {
        this.router.post( '/', 
            [
                check( 'name', 'The name is required' ).not().isEmpty(),
                check( 'email', 'The email is not valid' ).isEmail(),
                check( 'email' ).custom( DBValidator.findEmail ),
                check( 'password', 'The password must be at least 6 characters long' ).isLength({ min: 6 }),
                check( 'rol' ).custom( DBValidator.isValidRole ),
                ValidateInput.validateFields
            ],
            UsersController.createUser 
        );

        this.router.get( '/', UsersController.getUsers );

        this.router.put( '/:id', 
            [
                check( 'id', 'The ID is invalid' ).isMongoId(),
                check( 'id' ).custom( DBValidator.findUserById ),
                check( 'rol' ).custom( DBValidator.isValidRole ),
                ValidateInput.validateFields
            ],
            UsersController.updateUser 
        );

        this.router.delete( '/:id', 
            [
                ValidateInput.validateJWT,
                ValidateRoles.havePermission( 'ADMIN_ROLE', 'SALES_ROLE', 'USER_ROLE' ),
                check( 'id', 'The ID is invalid' ).isMongoId(),
                check( 'id' ).custom( DBValidator.findUserById ),
                ValidateInput.validateFields
            ],
            UsersController.deleteUser
        );
    }
}

const userRoutes = new UsersRoutes();
export default userRoutes.router;