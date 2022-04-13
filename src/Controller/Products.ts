import { Request, Response } from 'express';

import ProductSchema from '../Models/Product';
import IProduct from '../Interfaces/Product';

class Product {
    public static async getProducts( req: Request, res: Response ): Promise<Response> {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };

        try {
            const [ total, products ] = await Promise.all([
                ProductSchema.countDocuments( query ),
                ProductSchema.find( query ).populate( 'user', 'name' ).populate( 'category', 'name' )
                             .skip( Number( from ) ).limit( Number( limit ) )
            ]);
            return res.status(201).json({ ok: true, total, products });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'There was an error searching for the products' });
        }
    }

    public static async createProduct( req: any, res: Response ): Promise<Response> { 
        const { status, user, ...body } = req.body;
        body.name = body.name.toUpperCase();
        
        try {
            let product: IProduct | null = await ProductSchema.findOne({ name: body.name });
            if( product ) {
                return res.status(400).json({ 
                    ok: false,
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
    
            return res.status(201).json({ ok: true, newProduct });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'There was an error creating the product' });
        }
    }

    public static async updateProduct( req: any, res: Response ): Promise<Response> {
        const { id } = req.params;
        const { status, user, ...data } = req.body;

        if( data.name ) {
            data.name = data.name.toUpperCase();
        }
        data.user = req.user._id;

        try {
            let productDB = await ProductSchema.findOne({ name: data.name });
            if( productDB ) {
                return res.status(400).json({ 
                    ok: false, 
                    message: `Product with name:"${ productDB?.name }" already exists` 
                });
            }

            const product = await ProductSchema.findByIdAndUpdate( id, data, { new: true });
            return res.status(201).json({ ok: true, product });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'There was an error updating the product' });
        }      
    }

    public static async deleteProduct( req: Request, res: Response ): Promise<Response> {
        const { id } = req.params;

        try {
            const productDB = await ProductSchema.findById( id );
            if( !productDB?.status ) {
                return res.status(400).json({ ok: false, message: `Product with name:"${ productDB?.name }" already exists` });
            }

            const product = await ProductSchema.findByIdAndUpdate( id, { status: false }, { new: true });
            return res.status(201).json({ ok: true, product });
        } catch (error) {
            return res.status(500).json({ ok: false, message: 'There was an error deleting the product' });
        }
    }
}

export default Product;