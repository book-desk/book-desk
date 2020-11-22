import * as mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { CONNECTION_STRING } from '../configs/constant';

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger('Successfully connected to db');
  })
  .catch(logger);
