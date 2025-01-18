import { model, Schema } from "mongoose";

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
    default: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
  },
  groups: {
    type: Array,
    default: [],
    ref: 'groups'
  },
  privateUsers: {
    type: Array,
    default: []
  }
})

export const usersModel = model('users', usersSchema)