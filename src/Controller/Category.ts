import { Request, Response } from 'express';
import { CategorySchema } from '../Models/Index';
import ICategory from '../Interfaces/Category';

class Category {
    public static async getCategories( req: Request, res: Response ): Promise<Response> {
        const { limit = 5, since = 0 } = req.query;
        const query = { status: true };

        try {
            const [ total, categories ] = await Promise.all([
                CategorySchema.countDocuments( query ),
                CategorySchema.find( query ).populate( 'user', 'name' )
                    .skip( Number( since) ).limit( Number(limit) )
            ]);
            
            return res.status(200).json({
                ok: true,
                total,
                categories
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error getting categories',
            });   
        }
    }

    public static async getCategoryById( req: Request, res: Response ): Promise<Response> {
        const { id } = req.params;

        try {
            const category: ICategory | null = await CategorySchema.findById( id ).populate( 'user', 'name' );
            
            if( !(category!.status) ) {
                return res.status(400).json({
                    ok: false,
                    message: 'Category is not active',
                });
            }

            return res.status(200).json({ ok: true, category });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error getting category',
            });
        }
    }

    public static async createCategory( req: any, res: Response ): Promise<Response> {
        const name = req.body.name.toUpperCase();
        
        try {
            const categoryDB = await CategorySchema.findOne({ name });
            if( categoryDB ) { 
                return res.status(400).json({
                    ok: false,
                    message: `Category: ${ name } already exists`
                });
            }

            const data = {
                name,
                user: req.user._id
            }
            const newCategory = new CategorySchema( data );
            await newCategory.save();

            return res.status(201).json({ ok: true, category: newCategory });
        } catch (error) {
            return req.status(500).json({ ok: false, message: 'Error creating category' });
        }
    }
}

export default Category;