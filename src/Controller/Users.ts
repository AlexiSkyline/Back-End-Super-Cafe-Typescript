import { Request, Response } from 'express';

import bcryptjs from 'bcryptjs';
import UserSchema from '../Models/User';
import IUser from '../Interfaces/User';

class Users {
    public static async createUser( req: Request, res: Response ) {
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

    public static async getUsers( req: Request, res: Response ) {
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
}

export default Users;