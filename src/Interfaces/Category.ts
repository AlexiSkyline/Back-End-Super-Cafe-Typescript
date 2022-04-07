import { Types } from 'mongoose';

interface Category {
    name: string;
    status: boolean;
    user: Types.ObjectId;
}

export default Category;