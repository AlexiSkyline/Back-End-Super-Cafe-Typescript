import { Response } from 'express';
import { Types } from 'mongoose';
import { CategorySchema, UserSchema } from '../Models/Index';

class Search {
    private static allowedCollections: string[] = [ 'users', 'category', 'products', 'roles' ];

    public static async searchUser( term: string, res: Response ): Promise<Response> {
        const isMongoID: boolean = Types.ObjectId.isValid( term );

        if( isMongoID ) {
            const user = await UserSchema.findById( term );
            return res.status(201).json({ 
                ok: true,  
                resuts: ( user ) ? [ user ] : null
            });
        }

        const regex = new RegExp( term, 'i' );
        const users = await UserSchema.find({ 
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }]
        });

        return res.status(201).json({ ok: true, resuts: users });
    }

    public static async searchCategory( term: string, res: Response ): Promise<Response> {
        const isMongoID: boolean = Types.ObjectId.isValid( term );
        if( isMongoID ) {
            const category = await CategorySchema.findById( term );
            return res.status(201).json({ 
                ok: true,  
                resuts: ( category ) ? [ category ] : []
            });
        }

        const regex = new RegExp( term, 'i' );
        const categories = await CategorySchema.find({ name: regex, status: true });

        return res.status(201).json({ ok: true, resuts: categories });
    }
}