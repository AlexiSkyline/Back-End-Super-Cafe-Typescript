import { Request, Response } from 'express';

import bcryptjs from 'bcryptjs';
import UserSchema from '../Models/User';
import IUser from '../Interfaces/User';

class Users {
    public static async createUser( req: Request, res: Response ): Promise<Response> {
        const { name, email, password, rol } = req.body;

        try {
            let newUser: IUser | any = new UserSchema({ name, email, password, rol });            
            // ? Encrypt the password
            const salt = bcryptjs.genSaltSync();
            newUser.password = bcryptjs.hashSync( password, salt );
            
            // ? Save the user
            await newUser.save();

            return res.status(201).json({ ok: true, user: newUser });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'Failed to save user' });
        }
    }

    public static async getUsers( req: Request, res: Response ): Promise<Response> {
        const { limit = 10, from = 1 } = req.query;
        const query = { status: true };

        try {
            const [ total, users ] = await Promise.all([
                UserSchema.countDocuments( query ),
                UserSchema.find( query ).skip( Number( from ) - 1 ).limit( Number( limit ) )
            ]);

            return res.status(200).json({ ok: true, total, users });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'Failed to get users' });
        }
    }

    public static async updateUser( req: Request, res: Response ): Promise<Response> {
        const { id } = req.params;
        const { _id, password, google, correo, ...rest } = req.body;

        // Todo: Validate against the database
        if( password ) {
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync( password, salt );
        }

        try {
            const user = await UserSchema.findByIdAndUpdate( id, rest, { new: true } );

            return res.status(200).json({ ok: true, user });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'Failed to update user' });
        }
    }

    public static async deleteUser( req: Request, res: Response ): Promise<Response> {
        const { id } = req.params;

        try {
            // ? We change the state of the user
            const userDisabled = await UserSchema.findByIdAndUpdate( id, { status: false }, { new: true } );
            
            return res.status(200).json({ ok: true, userDisabled });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'Failed to delete user' });
        }
    }
}

export default Users;