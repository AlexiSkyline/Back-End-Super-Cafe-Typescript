import { Schema, model } from 'mongoose';
import Producto from '../interfaces/Producto';

const ProductoSchema = new Schema<Producto>({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El Usuario es obligatorio' ],
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true 
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
});

// Todo: Quitamos los atributos __v y estado del Schema  
ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...producto } = this.toObject();
    return producto;
}

export default model( 'Producto', ProductoSchema );