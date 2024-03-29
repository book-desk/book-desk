import { Document, Model, model, Types, Query, Schema } from 'mongoose';
import { Company } from '@book-desk/data';
import { BaseSchema } from '../db/BaseSchema';

export interface CompanySchema extends Document, Company {}
// For model
export type CompanyModel = Model<CompanySchema>;

const CompanySchema = new BaseSchema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  companyId: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    lowercase: true,
    required: true,
  },
  logo: {
    type: Buffer,
  },
  cities: {
    type: [String],
  },
});

CompanySchema.methods.toJSON = function () {
  const company = this.toObject();

  delete company._id;
  delete company.__v;

  return company;
};

CompanySchema.pre<CompanySchema>('save', async function (next) {
  if (this.isModified('name')) {
    this.companyId = this.name.replace(' ', '-').toLocaleLowerCase();
  }

  next();
});

const Company = model<CompanySchema, CompanyModel>('Company', CompanySchema);

export default Company;
