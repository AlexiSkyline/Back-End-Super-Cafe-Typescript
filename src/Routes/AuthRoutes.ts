import { Router } from 'express';

class AuthRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post( '/login' );
        this.router.post( '/google' );
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;