import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { UserSchema } from '../Models/Index';
import GeneratorJWT from '../Helpers/GeneratorJWT';

class Auth {
    public static async Login( req: Request, res: Response ): Promise<Response> {
        const { email, password } = req.body;

        try {
            // * Check if the email exists
            const user = await UserSchema.findOne({ email });
            if( !user ) {
                return res.status(400).json({
                    ok: false,
                    message: 'User / Password incorrect - Email does not exist'
                });
            }

            // * Check if the User is active
            if( !user.status ) {
                return res.status(400).json({
                    ok: false,
                    message: 'User / Password incorrect - User is not active'
                });
            }

            // * Check if the password is correct
            const validPassword = bcryptjs.compareSync( password, user.password );
            if( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    message: 'User / Password incorrect - Password is incorrect'
                });
            }
            
            // * Generate the token
            const token = await GeneratorJWT.generateToken( user.id );

            return res.status(200).json({ 
                ok: true,
                user,
                token
            });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'Failed to login' });
        }
    }
}

export default Auth;