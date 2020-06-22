import { Document, Model, model, Types, Query, Schema } from 'mongoose';
import { BaseSchema } from '../db/BaseSchema';
import { WorkPlaceSchema, WorkPlace } from './workplace';
import { secret } from '../configs/constant';

export interface Office {
  name: string;
  companyId: string;
  admin: string;
  logo?: Buffer;
  workplaces: Array<WorkPlace>;
  city?: String;
  address?: String;
}

export interface OfficeSchema extends Document, Office {}
// For model
export interface OfficeModel extends Model<OfficeSchema> {}

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
  address: {
    type: String,
  },
  companyId: {
    type: String,
    required: true,
  },
  workplaces: {
    type: [WorkPlaceSchema],
  },
});

OfficeSchema.methods.toJSON = function () {
  const company = this.toObject();

  delete company._id;
  delete company.__v;

  return company;
};

const Office = model<OfficeSchema, OfficeModel>('Office', OfficeSchema);

export default Office;
