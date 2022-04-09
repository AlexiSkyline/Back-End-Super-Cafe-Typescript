import { Router } from 'express';

class UsersRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routers();
    }

    routers() {
        this.router.post( '/' );
        this.router.get( '/' );
        this.router.put( '/:id' );
        this.router.delete( '/:id' );
    }
}

const userRoutes = new UsersRoutes();
export default userRoutes.router;