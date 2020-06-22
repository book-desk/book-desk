import { Document, Model, model, Types, Query, Schema } from 'mongoose';
import { BaseSchema } from '../db/BaseSchema';

export interface WorkPlace {
  placeNumber: number;
  availability: boolean;
  bookedDates: Object;
  name?: string;
}
export interface WorkPlaceSchema extends Document, WorkPlace {}

export const WorkPlaceSchema = new BaseSchema({
  placeNumber: {
    type: Number,
    unique: true,
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
