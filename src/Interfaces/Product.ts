import { Types } from 'mongoose';

interface Product {
    name: string;
    status: boolean;
    user: Types.ObjectId;
    price: number;
    category: Types.ObjectId;
    description: string;
    available: boolean;
    img: string;
}

export default Product;