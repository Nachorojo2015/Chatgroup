import { messagesModel } from "../models/Messages.js";
import crypto from "crypto"
import fs from "fs"
import { getFileUrl, uploadFile } from "../config/firebaseConfig.js";
import { decrypt, encrypt } from "../utils/encrypt.js";
import { groupsModel } from "../models/Groups.js";
import { privatesModel } from "../models/Private.js";
import { usersModel } from "../models/Users.js";

export class MessagesRepository {
    static async createMessage({ message }) {
        const { format, content, chatId, user, typeChat } = message
        const encryptedContent = encrypt(content)

        const newMessage = await messagesModel.create({
            format,
            content: encryptedContent,
            chatId,
            user,
            date: new Date()
        })

        const userSender = await usersModel.findById({_id: user})

        if (typeChat === 'group') {
            const chatGroup = await groupsModel.findById({_id: chatId})
            chatGroup.lastMessage.content = format === 'text' ? content : format
            chatGroup.lastMessage.date = newMessage.date
            chatGroup.lastMessage.fullname = userSender.fullname
            await chatGroup.save()
        } else {
            const chatPrivate = await privatesModel.findById({_id: chatId})
            chatPrivate.lastMessage.content = format === 'text' ? content : format
            chatPrivate.lastMessage.date = newMessage.date
            chatPrivate.lastMessage.fullname = userSender.fullname
            await chatPrivate.save()
        }

        const populatedMessage = await newMessage.populate({
            path: 'user',
            select: 'avatar username fullname', // Selecciona los campos que quieres devolver del usuario
        });

        populatedMessage.content = decrypt(populatedMessage.content)

        return populatedMessage
    }

    static async getMessages({ id }) {
        const messages = await messagesModel.find({
            chatId: id
        }).populate({
            path: 'user',
            select: 'avatar fullname'
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
        const randomUUID = crypto.randomUUID();
        const fileType = file.mimetype.split('/').pop();
        const destination = `media/${randomUUID}.${fileType}`;
    
        await uploadFile(file.path, destination);
        
        const fileUrl = await getFileUrl(destination);
    
        fs.unlinkSync(file.path)
    
        return fileUrl;
    }

    static async markMessagesAsSeen({ messageId, userId }) {
        const message = await messagesModel.findById({ _id: messageId })

        if (!message.seenBy.includes(userId)) {
            message.seenBy.push(userId)
            await message.save()
        }

        return message
    }

    static async deleteMessage({ messageId, typeChat }) {
        const message = await messagesModel.findByIdAndDelete({ _id: messageId })
        const messages = await messagesModel.find({ chatId: message.chatId })

        if (messages.length > 0) {
            // Buscar el mensaje anterior en el mismo chat
            const { format, content, date, user, chatId } = messages[messages.length - 1]
            const userSender = await usersModel.findById({_id: user._id})
            if (typeChat === 'group') {
                const chatGroup = await groupsModel.findById({_id: chatId})
                chatGroup.lastMessage.content = format === 'text' ? decrypt(content) : format
                chatGroup.lastMessage.date = date
                chatGroup.lastMessage.fullname = userSender.fullname
                await chatGroup.save()
            } else {
                const chatPrivate = await privatesModel.findById({_id: chatId})
                chatPrivate.lastMessage.content = format === 'text' ? decrypt(content) : format
                chatPrivate.lastMessage.date = date
                chatPrivate.lastMessage.fullname = userSender.fullname
                await chatPrivate.save()
            }
        } else {
            if (typeChat === 'group') {
                const chatGroup = await groupsModel.findById({_id: message.chatId})
                chatGroup.lastMessage.content = ''
                chatGroup.lastMessage.date = ''
                chatGroup.lastMessage.fullname = ''
                await chatGroup.save()
            } else {
                const chatPrivate = await privatesModel.findById({_id: message.chatId})
                chatPrivate.lastMessage.content = ''
                chatPrivate.lastMessage.date = ''
                chatPrivate.lastMessage.fullname = ''
                await chatPrivate.save()
            }
        }


        return message
    }
}