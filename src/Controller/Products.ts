import { Request, Response } from 'express';
import ProductSchema from '../Models/Product';

class Product {
    public static async getProducts( req: Request, res: Response ): Promise<Response> {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };

        const [ total, products ] = await Promise.all([
            ProductSchema.countDocuments( query ),
            ProductSchema.find( query ).populate( 'user', 'name' ).populate( 'category', 'name' )
                         .skip( Number( from ) ).limit( Number( limit ) )
        ]);

        return res.status(201).json({ total, products });
    }
}

export default Product;