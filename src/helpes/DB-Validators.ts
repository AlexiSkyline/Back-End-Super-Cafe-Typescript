import { RoleSchema, UserSchema, CategorySchema, ProductSchema } from '../Models/Index';

/*
    * is a class that contains all the methods to validate the data 
    * @Class: DBValidators
*/

class DBValidator {
    /*
        * Validate if the rol exists in the database
        * @method: isValidRol
        * @params rol: string - rol to validate and find in the database
    */
    public static async isValidRole( rol: string ): Promise<void> {
        // Todo: check if the role exists
        const existRole = await RoleSchema.findOne({ rol });
        if( !existRole ) {
            throw new Error( `The role '${ rol }' does not exist in the database` );
        }
    }

    /*
        * Validate if the email is already registered in the database
        * @method: isValidEmail
        * @params email: string - email to validate and find in the database
    */
    public static async findEmail( email: string ): Promise<void> {
        // Todo: check if the email exists
        const existEmail = await UserSchema.findOne({ email });
        if( existEmail ) {
            throw new Error( `The email '${ email }' is already registered` );
        }
    }

    /*
        * find the user by @params id and validate if the user exists
        * @method: findUserById
        * @params id: string - id of the user to validate and find in the database
    */
    public static async findUserById( id: string ): Promise<void> {
        // Todo: check if the user exists
        const existUser = await UserSchema.findById( id );
        if( !existUser ) {
            throw new Error( `The user with the id '${ id }' does not exist in the database` );
        }
    }

    /*
        * find the Category by @params id and validate if the Category exists
        * @method: findCategoryById
        * @params id: string - id of the category to validate and find in the database
    */
    public static async findCategoryById( id: string ): Promise<void> {
        // Todo: check if the Category exists
        const existCategory = await CategorySchema.findById( id );
        if( !existCategory ) {
            throw new Error( `The category with the id '${ id }' does not exist in the database` );
        }
    }

    /*
        * find the Product by @params id and validate if the Product exists
        * @method: findProductById
        * @params id: string - id of the Product to validate and find in the database
    */
    public static async findProductById( id: string ): Promise<void> {
        // Todo: check if the Product exists
        const existProdut = await ProductSchema.findById( id );
        if( !existProdut ) {
            throw new Error( `The product with the id '${ id }' does not exist in the database` );
        }
    }
}

export default DBValidator;