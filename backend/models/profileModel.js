const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // to designate one profile per user
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true, 
      trim: true,
    },
    stageNames: [
      {
        type: String,
        required: true, // required at least one site
      },
    ],
  },
  { timestamps: true, }
);

module.exports = mongoose.model('Profile', profileSchema);