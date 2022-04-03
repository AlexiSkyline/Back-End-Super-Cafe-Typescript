import { Schema, model } from 'mongoose';
import Product from '../Interfaces/Product';

const ProductSchema = new Schema<Product>({
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
        required: [ true, 'The user is required' ],
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true 
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
});

// Todo: We remove the __v and state attributes from the Schema
ProductSchema.methods.toJSON = function() {
    const { __v, status, ...product } = this.toObject();
    return product;
}

export default model( 'Product', ProductSchema );