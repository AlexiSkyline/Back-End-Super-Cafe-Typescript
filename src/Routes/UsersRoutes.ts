import { Router } from 'express';
import UsersController from '../Controller/Users';

class UsersRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routers();
    }

    routers() {
        this.router.post( '/', UsersController.createUser );
        this.router.get( '/' );
        this.router.put( '/:id' );
        this.router.delete( '/:id' );
    }
}

const userRoutes = new UsersRoutes();
export default userRoutes.router;