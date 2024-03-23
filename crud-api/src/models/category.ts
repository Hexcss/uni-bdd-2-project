import mongoose, {Schema, Document} from 'mongoose';

interface ICategory extends Document {
    id: string;
    name: string;
    description: string;
}

const categorySchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const Category = mongoose.model<ICategory>('Category',categorySchema, 'categorys');
export default Category;

