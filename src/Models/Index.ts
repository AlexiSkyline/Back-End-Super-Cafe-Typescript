/*
    * This file is used to optimize imports,
    * so that we only add references to a single file
    * when we want to import more than 1 file from the "Models" folder.
*/
import CategorySchema from './Category';
import ProductSchema from './Product';
import RoleSchema from './Role';
import ServerSchema from './Server';
import UserSchema from './User';

export {
    CategorySchema,
    ProductSchema,
    RoleSchema,
    ServerSchema,
    UserSchema
}