import { Schema, model, Types } from 'mongoose';

interface Categoria {
    nombre: string;
    estado: boolean;
    usuario: Types.ObjectId;
}

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