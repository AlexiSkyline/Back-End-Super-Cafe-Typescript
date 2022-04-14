import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import IUser from '../Interfaces/User';
import { UserSchema } from '../Models/Index';
/*
    * is a class that contains all the methods to validate the data sent by the user 
    * @Class: ValidateInput
*/
class ValidateInput {
    /*
        * Validate if some error in the request, wearing express-validator
        * @method: validateFields
        * @params req: AnySchema - mistakes in the request
        * @params res: Response - return the response with the status and the message
        * @params next: NextFunction - call the next function
    */
    public static validateFields( req: Request, res: Response, next: NextFunction ): Response | void {
        const errors = validationResult( req );
        if( !errors.isEmpty() ) {
            return res.status(400).json( errors );
        }

        next();
    }

    /*
        * Validate if the user send the file
        * @method: validateFile
        * @params req: File - file send by the user
        * @params res: Response - return the response with the status and the message
        * @params next: NextFunction - call the next function
    */
    public static validateFile( req: any, res: Response, next: NextFunction ): Response | void {
        if( !req.files || Object.keys( req.files ).length === 0 || !req.files.archive ) {
            return res.status(400).json({
                ok: false,
                message: 'There are no files to upload - validateFile'
            });
        }

        next();
    }

    /*
        * We validate @params req check user token
        * @method: validateJWT
        * @params req: Request | any - user and token information
        * @params res: Response - return the response with the status and the message
        * @params next: NextFunction - call the next function
    */
    public static async validateJWT( req: Request | any, res: Response, nex: NextFunction ): Promise<Response | void> {
        const token = req.header( 'x-token' );

        if( !token ) {
            return res.status( 401 ).json({ ok: false, message: 'There is no token in the request' });
        }

        try {
            const { uid }: any = jwt.verify( token, process.env.SECRET_JWT_SEED || 'secret' );
            const user: IUser | null = await UserSchema.findById( uid );

            if( !user ) {
                return res.status( 401 ).json({ 
                    ok: false, 
                    message: 'Token is not valid - The User does not exist in the database' 
                });
            }

            // ? Check if the user's uid has active status
            if( !user.status ) {
                return res.status( 401 ).json({ 
                    ok: false, 
                    message: 'Token is not valid - The User is not active' 
                });
            }

            req.user = user;
            req.uid  = uid;

            nex();
        } catch (error) {
            return res.status( 401 ).json({ ok: false, message: 'The token is not valid' });
        }
    }
}

export default ValidateInput;