import mongoose, { model, Schema } from "mongoose";

const messagesSchema = new Schema({
    format: {
        type: String,
        enum: ['text', 'image', 'video', 'file', 'audio']
    },
    date: {
        type: Date,
        default: new Date()
    },
    content: {
        type: String
    },
    chatId: {
        type: mongoose.Schema.ObjectId
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    seen: {
        type: Boolean,
        default: false
    }
})

export const messagesModel = model('messages', messagesSchema)