/*
    * This file is used to optimize imports,
    * so that we only add references to a single file
    * when we want to import more than 1 file from the "Models" folder.
*/
import Category from './Category';
import Product from './Product';
import Role from './Role';
import Server from './Server';
import User from './User';

export {
    Category,
    Product,
    Role,
    Server,
    User
}