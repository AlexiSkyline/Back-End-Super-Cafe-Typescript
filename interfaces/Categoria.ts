import { Types } from 'mongoose';

interface Categoria {
    nombre: string;
    estado: boolean;
    usuario: Types.ObjectId;
}

export default Categoria;