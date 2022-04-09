import { Router } from 'express';
import { check } from 'express-validator';
import UsersController from '../Controller/Users';
import DBValidator from '../Helpers/DBValidator';

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
            check( 'rol' ).custom( DBValidator.isValidRole )
        ],
        UsersController.createUser );
        this.router.get( '/' );
        this.router.put( '/:id' );
        this.router.delete( '/:id' );
    }
}

const userRoutes = new UsersRoutes();
export default userRoutes.router;