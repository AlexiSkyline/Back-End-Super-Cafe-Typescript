import { Response, Request } from 'express';
import { Types } from 'mongoose';
import { CategorySchema, ProductSchema, UserSchema } from '../Models/Index';

class Search {
    private allowedCollections: string[] = [ 'users', 'category', 'products', 'roles' ];

    public selectsSearch( req: Request, res: Response ): Response | void {
        const { collection, term } = req.params;

        if( !this.allowedCollections.includes( collection ) ) {
            return res.status(400).json({
                ok: false,
                message: `The allowed collections are: ${ this.allowedCollections }`
            });
        }

        switch( collection ) {
            case 'user':
                this.searchUser( term, res );
                break;
            case 'category':
                this.searchCategory( term, res );
                break;
            case 'products':
                this.searchProduct( term, res );
                break;
            default: 
                return res.status(500).json({ 
                    ok: false, 
                    message: `We couldn't search the collection: ${ term }`
                });
        }
    }

    private async searchUser( term: string, res: Response ): Promise<Response> {
        const isMongoID: boolean = Types.ObjectId.isValid( term );

        if( isMongoID ) {
            const user = await UserSchema.findById( term );
            return res.status(200).json({ 
                ok: true,  
                resuts: ( user ) ? [ user ] : null
            });
        }

        const regex = new RegExp( term, 'i' );
        const users = await UserSchema.find({ 
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }]
        });

        return res.status(200).json({ ok: true, resuts: users });
    }

    private async searchCategory( term: string, res: Response ): Promise<Response> {
        const isMongoID: boolean = Types.ObjectId.isValid( term );
        if( isMongoID ) {
            const category = await CategorySchema.findById( term );
            return res.status(200).json({ 
                ok: true,  
                resuts: ( category ) ? [ category ] : []
            });
        }

        const regex = new RegExp( term, 'i' );
        const categories = await CategorySchema.find({ name: regex, status: true });

        return res.status(200).json({ ok: true, resuts: categories });
    }

    private async searchProduct( term: string, res: Response ): Promise<Response> {
        const isMongoId: boolean = Types.ObjectId.isValid( term );
        if( isMongoId ) {
            const product = await ProductSchema.findById( term );
            return res.status(201).json({
                ok: true,
                results: ( product ) ? [ product ] : []
            });
        }

        const regex = new RegExp( term, 'i' );
        const products = await ProductSchema.find({ name: regex, status: true })
                                        .populate( 'category', 'name' );
        return res.status(200).json({ ok: true, results: products });
    }
}