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
}

export default DBValidator;