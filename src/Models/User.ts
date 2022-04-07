import { Schema, model } from 'mongoose';
import User from '../Interfaces/User';

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: [ true, 'The name is required' ]
    },
    email: {
        type: String,
        required: [ true, 'The email is required' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'The password is required' ]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

// Todo: Remove __v and password attributes from the Schema response, change id to uid
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;

    return user;
}

export default model( 'User', UserSchema );