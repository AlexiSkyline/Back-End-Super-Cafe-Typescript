import { Schema, model } from 'mongoose';
import Role from '../Interfaces/Role';

const RoleSchema = new Schema<Role>({
    rol: {
        type: String,
        required: [ true, 'The Rol is required' ]
    }
});

export default model( 'Role', RoleSchema );