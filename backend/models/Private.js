import mongoose, { model, Schema } from "mongoose";

const privateSchema = new Schema({
    users: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'users'
        }
    ],
    creationDate: {
        type: Date,
        default: new Date()
    },
    lastMessage: {
      content: String,
      date: Date,
      fullname: String
    }
})

export const privatesModel = mongoose.model('privates', privateSchema)