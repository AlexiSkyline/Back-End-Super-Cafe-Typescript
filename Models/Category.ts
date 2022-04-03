import { Schema, model } from 'mongoose';
import Category from '../Interfaces/Category';

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: [ true, 'The name is required' ],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'The user is required' ]
    }
});

// Todo: We remove the attributes __v and id from the Schema.
CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    return category;
}

export default model( 'Category', CategorySchema );