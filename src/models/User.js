import { Schema, model } from 'mongoose';

const user = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    refreshTokens: [{ type: String }],
    emailActivationToken: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    isBanned: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: Number,
      required: true,
      default: 0,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default model('User', user);
