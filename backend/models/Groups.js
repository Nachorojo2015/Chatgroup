import mongoose, { model, Schema } from "mongoose";

const groupsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        require: true
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    visibility: {
        type: String,
        enum: ['Public', 'Private'],
        default: 'Private'
    },
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'users'
        }
    ],
    administrators: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'users'
        }
    ],
    blockedUsers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'users'
        }
    ]
})

export const groupsModel = model('groups', groupsSchema)