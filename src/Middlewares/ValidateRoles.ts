import { Request, Response, NextFunction } from 'express';
/*
    * is a class that contains all the methods to validate the roles the user has
    * @Class: ValidateInput
*/

class ValidateRoles {
    /*
        * Validate if the user has the role to admin
        * @method: isAdmin
        * @params req: Request | AnySchema - information of the user
        * @params res: Response - return the response with the status and the message
        * @params next: NextFunction - call the next function
    */
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

    /*
        * Validate if the user has the permission
        * @method: havePermission
        * @parasm ...roles: string[] - list of roles with the permission
        * @params req: Request | AnySchema - information of the user
        * @params res: Response - return the response with the status and the message
        * @params next: NextFunction - call the next function
    */
    public static havePermission( ...roles: string[] ): any {
        return ( req: Request | any, res: Response, next: NextFunction ): Response | void => {
            if( !req.user ) {
                return res.status(500).json({ 
                    ok: false, 
                    message: 'You want to verify the role without validating the token first' 
                });
            }

            if( !roles.includes( req.user.rol ) ) {
                return res.status(401).json({ 
                    ok: false, 
                    message: `The user ${ req.user.nombre } does not have the permission` 
                });
            }
        }
    }
}

export default ValidateRoles;