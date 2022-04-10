import { Request, Response, NextFunction } from 'express';
/*
    * is a class that contains all the methods to validate the roles the user has
    * @Class: ValidateInput
*/

class validateRoles {
    public static isAdmin( req: Request | any, res: Response, next: NextFunction ): Response | void {
        if( !req.user ) {
            return res.status(500).json({ 
                ok: false, 
                message: 'You want to verify the role without validating the token first' 
            });
        }

        const { rol, nombre } = req.user;

        if( rol !== 'ADMIN_ROLE' ) {
            return res.status(401).json({ 
                ok: false, 
                message: `The user ${ nombre } is not an admin` 
            });
        }

        next();
    }
}