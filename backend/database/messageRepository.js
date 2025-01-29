import { messagesModel } from "../models/Messages.js";

export class MessagesRepository {
    static async createMessage({ message }) {
        const { format, content, chatId, user } = message

        const newMessage = await messagesModel.create({
            format,
            content,
            chatId,
            user
        })

        return newMessage.populate({
            path: 'user',
            select: 'avatar username'
        })
    }

    static async getMessages({ id }) {
        const messages = await messagesModel.find({
            chatId: id
        }).populate({
            path: 'user',
            select: 'avatar username'
        })

        return messages
    }
}