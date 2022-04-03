import { Types } from 'mongoose';

interface Producto {
    nombre: string;
    estado: boolean;
    usuario: Types.ObjectId;
    precio: number;
    categoria: Types.ObjectId;
    descripcion: string;
    disponible: boolean;
    img: string;
}

export default Producto;