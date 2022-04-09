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

}

export default DBValidator;