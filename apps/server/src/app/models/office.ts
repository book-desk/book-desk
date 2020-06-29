import { Document, Model, model, Types, Query, Schema } from 'mongoose';
import { BaseSchema } from '../db/BaseSchema';
import { WorkPlaceSchema, WorkPlace } from './workplace';
import { secret } from '../configs/constant';

export interface Office {
  name: string;
  number: string;
  companyId: string;
  admin: string;
  logo?: Buffer;
  workplaces: Array<WorkPlace>;
  city?: string;
  address?: string;
}

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
