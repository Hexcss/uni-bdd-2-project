import mongoose, {Schema} from 'mongoose';
import { ITag } from '../utils/types';


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
export default Tag;