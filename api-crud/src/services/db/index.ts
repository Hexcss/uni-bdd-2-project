import mongoose from 'mongoose';
import { environment } from '../../config';
import loggingMiddleware from '../../middlewares/logger/index';

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(environment.MONGO_URI);
    loggingMiddleware.logger.info('Connected to MongoDB');
  } catch (error) {
    loggingMiddleware.logger.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectDatabase;
