import { Document } from 'mongoose';
import { WorkPlace } from '@book-desk/data';
import { BaseSchema } from '../db/BaseSchema';

export interface WorkPlaceSchema extends Document, WorkPlace {}

export const WorkPlaceSchema = new BaseSchema({
  placeNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  officeId: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
  },
  bookedDates: {
    type: Object,
  },
  name: {
    type: String,
  },
});
