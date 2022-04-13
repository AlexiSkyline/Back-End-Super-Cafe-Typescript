import { Router } from 'express';
import { check } from 'express-validator';

import Auth from '../Controller/Auth';
import ValidateInput from '../Middlewares/ValidateInput';

class AuthRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post( '/login', 
            [
                check( 'email', 'Email is required' ).not().isEmpty(),
                check( 'password', 'Password is required' ).not().isEmpty(),
                ValidateInput.validateFields
            ],
            Auth.Login 
        );

        this.router.post( '/google',
            [
                check( 'id_token', 'The id_token is required' ).not().isEmpty(),
                ValidateInput.validateFields
            ],
            Auth.googleSignIn
        );
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;