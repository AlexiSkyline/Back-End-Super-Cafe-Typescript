import { Request, Response } from 'express';

import ProductSchema from '../Models/Product';
import IProduct from '../Interfaces/Product';

class Product {
    public static async GetProducts( req: Request, res: Response ): Promise<Response> {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };

        const [ total, products ] = await Promise.all([
            ProductSchema.countDocuments( query ),
            ProductSchema.find( query ).populate( 'user', 'name' ).populate( 'category', 'name' )
                         .skip( Number( from ) ).limit( Number( limit ) )
        ]);

        return res.status(201).json({ total, products });
    }

    public static async CreateProduct( req: any, res: Response ): Promise<Response> { 
        const { status, user, ...body } = req.body;
        body.name = body.nombre.toUppercase();
        
        let product: IProduct | null = await ProductSchema.findOne({ name: body.name });
        if( product ) {
            return res.status(400).json({ 
                msg: `The Product with the name:"${ product.name }" already exists`
            });
        }

        const data = {
            name: body.name,
            user: req.user._id,
            ...body
        }

        let newProduct = new ProductSchema( data );
        await newProduct.save();

        return res.status(201).json( newProduct );
    }
}

export default Product;