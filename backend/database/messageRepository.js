import { messagesModel } from "../models/Messages.js";
import crypto from "crypto"
import fs from "fs"
import { getFileUrl, uploadFile } from "../config/firebaseConfig.js";

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

    static async uploadFile({ file }) {
        const randomUUID = crypto.randomUUID()
        const fileType = file.mimetype.split('/').pop()
        const destination = `media/${randomUUID}.${fileType}`

        await uploadFile(file.path, destination)

        const fileUrl = await getFileUrl(destination)

        fs.unlinkSync(file.path)

        return fileUrl
    }
}