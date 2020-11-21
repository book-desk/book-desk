import { Document, Model, model } from 'mongoose';
import { Office } from '@book-desk/data';
import { BaseSchema } from '../db/BaseSchema';
import { WorkPlaceSchema } from './workplace';

export interface OfficeSchema extends Document, Office {}
// For model
export type OfficeModel = Model<OfficeSchema>;

const OfficeSchema = new BaseSchema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  admin: {
    type: String, //Schema.Types.ObjectId,
    lowercase: true,
  },
  city: {
    type: String,
  },
  number: {
    type: String,
  },
  address: {
    type: String,
  },
  companyId: {
    type: String,
    required: true,
  },
  workplaces: [WorkPlaceSchema],
});

OfficeSchema.methods.toJSON = function () {
  const document = this.toObject();

  delete document._id;
  delete document.__v;

  return document;
};

const Office = model<OfficeSchema, OfficeModel>('Office', OfficeSchema);

export default Office;
