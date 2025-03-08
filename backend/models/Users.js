import mongoose, { model, Schema } from "mongoose";

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  groups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'groups'
    }
  ],
  privateUsers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'privates'
    }
  ],
  blockedUsers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'users'
    }
  ]
})

export const usersModel = model('users', usersSchema)