import * as mongoose from 'mongoose';
import { logger } from '../utils/logger';
mongoose
  .connect('mongodb://127.0.0.1:27017/book-desk', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger('Successfully connected to db');
  })
  .catch(logger);
