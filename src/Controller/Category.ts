import { Request, Response } from 'express';
import { CategorySchema } from '../Models/Index';

class Category {
    public static async getCategories( req: Request, res: Response ): Promise<Response> {
        const { limit = 5, since = 0 } = req.query;
        const query = { status: true };

        try {
            const [ total, categories ] = await Promise.all([
                CategorySchema.countDocuments( query ),
                CategorySchema.find( query ).skip( Number( since) ).limit( Number(limit) )
            ]);
            
            return res.status( 200 ).json({
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
}

export default Category;