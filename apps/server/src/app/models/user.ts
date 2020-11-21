import { Document, Model, model } from 'mongoose';
import { User } from '@book-desk/data';
import { BaseSchema } from '../db/BaseSchema';
import validator from 'validator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../configs/constant';

export interface UserSchema extends Document, User {
  tokens: string[];
  findByCredentials(email: string, password: string): User;
  generateAuthToken(): string;
}

const UserSchema = new BaseSchema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
      return true;
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
      return true;
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this._id.toString(), expiresIn: '7d' }, SECRET);
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

// For model
export interface UserModel extends Model<UserSchema> {
  findByCredentials(username: string, password: string): UserSchema;
}

UserSchema.statics.findByCredentials = async (username, password) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const user = await UserModel.findOne({
    username: username.toLowerCase().trim(),
  });

  const isMatch = await bcrypt.compare(`${password}${SECRET}`, user.password);

  if (!user) {
    throw new Error('Unable to login');
  }

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

UserSchema.pre<UserSchema>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(`${this.password}${SECRET}`, 10);
  }

  next();
});

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  delete userObject._id;
  delete userObject.__v;

  return userObject;
};

const UserModel = model<UserSchema, UserModel>('User', UserSchema);

export default UserModel;
