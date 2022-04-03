import { Schema, model } from 'mongoose';
import Categoria from '../interfaces/Categoria';

const CategoriaSchema = new Schema<Categoria>({
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
        required: [ true, 'El Usuario es obligatorio' ]
    }
});

// Todo: Quitamos los atributos __v y id del Schema  
CategoriaSchema.methods.toJSON = function() {
    const { __v, _id, ...categoria } = this.toObject();
    return categoria;
}

export default model( 'Categoria', CategoriaSchema );