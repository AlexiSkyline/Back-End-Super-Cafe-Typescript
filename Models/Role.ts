import { Schema, model } from 'mongoose';
import Role from '../interfaces/Role';

const RoleSchema = new Schema<Role>({
    rol: {
        type: String,
        required: [ true, 'El Rol es obligatorio' ]
    }
});

export default model( 'Role', RoleSchema );