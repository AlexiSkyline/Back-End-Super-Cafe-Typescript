/*
    * This file is used to optimize imports,
    * so that we only add references to a single file
    * when we want to import more than 1 file from the "Models" folder.
*/
import Categoria from './Category';
import Producto from './Product';
import Role from './Role';
import Server from './Server';
import Usuario from './User';

export {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario
}