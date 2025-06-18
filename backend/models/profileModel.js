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
      unique: true,
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
        required: true,
      },
    ],
    sites: [
      {
        type: String,
        required: true,
      }
    ]
  },
  { timestamps: true, }
);

module.exports = mongoose.model('Profile', profileSchema);