import { messagesModel } from "../models/Messages.js";
import crypto from "crypto"
import fs from "fs"
import { getFileUrl, uploadFile } from "../config/firebaseConfig.js";
import { decrypt, encrypt } from "../utils/encrypt.js";

export class MessagesRepository {
    static async createMessage({ message }) {
        const { format, content, chatId, user } = message
        const encryptedContent = encrypt(content)

        const newMessage = await messagesModel.create({
            format,
            content: encryptedContent,
            chatId,
            user,
            date: new Date()
        })

        const populatedMessage = await newMessage.populate({
            path: 'user',
            select: 'avatar username', // Selecciona los campos que quieres devolver del usuario
        });

        populatedMessage.content = decrypt(populatedMessage.content)

        return populatedMessage
    }

    static async getMessages({ id }) {
        const messages = await messagesModel.find({
            chatId: id
        }).populate({
            path: 'user',
            select: 'avatar username'
        })

        const decryptedMessages = messages.map((message) => {
            return {
              ...message.toObject(),
              content: decrypt(message.content),
            }
        })

        return decryptedMessages
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

    static async markMessagesAsSeen({ messageId, userId }) {
        const message = await messagesModel.findById({ _id: messageId })

        if (!message.seenBy.includes(userId)) {
            message.seenBy.push(userId)
            await message.save()
        }

        return message
    }
}