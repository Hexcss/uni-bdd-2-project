import mongoose from 'mongoose';
import { IUser } from '../../utils/interfaces';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
