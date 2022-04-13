/*
    * This file is used to optimize imports,
    * so that we only add references to a single file
    * when we want to import more than 1 file from the "Routes" folder.
*/
import AuthRoutes from './AuthRoutes';
import CategoryRoutes from './CategoryRoutes';
import ProductsRoutes from './ProductsRoutes';
import UserRoutes from './UsersRoutes';

export {
    AuthRoutes,
    CategoryRoutes,
    ProductsRoutes,
    UserRoutes,
}