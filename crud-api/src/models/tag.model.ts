import mongoose, {Schema, Document} from 'mongoose';

interface ITag extends Document {
    id: string;
    name: string;
}

const tagSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    }

})

const Tag = mongoose.model<ITag>('Tag', tagSchema);