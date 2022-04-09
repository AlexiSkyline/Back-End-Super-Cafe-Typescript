import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import UserSchema from '../Models/User';
import IUser from '../Interfaces/User';

class Users {
    public static async createUser( req: Request, res: Response ) {
        const { name, email, password, rol } = req.body;
        try {
            const findUser: IUser | null = await UserSchema.findOne({ email });
            if( findUser ) {
                return res.status(400).json({
                    ok: false,
                    message: `The email ${ email } is already registered`
                });
            }
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'Error looking up user' });
        }

        try {
            let newUser: IUser | any = new UserSchema({ name, email, password, rol });
            // ? Encrypt the password
            newUser.password = this.EncryptPassword( newUser.password, newUser );
            // ? Save the user
            await newUser.save();

            return res.status(201).json({ ok: true, user: newUser });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'Failed to save user' });
        }
    }

    private static async EncryptPassword( password: string, user: IUser ): Promise<string> {
        // ? Encrypt the password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        
        return user.password
    }
}

export default Users;