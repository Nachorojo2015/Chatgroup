import { ValidateError } from "../errors/ValidateError.js";
import { privatesModel } from "../models/Private.js";
import { usersModel } from "../models/Users.js";

export class PrivateRepository {
    static async createPrivateChat({ idUserPrivate, userId}) {
        const user = await usersModel.findById({ _id: userId })
        if (!user) throw new ValidateError('user must exists')

        const privateUser = await usersModel.findById({ _id: idUserPrivate })
        if (!privateUser) throw new ValidateError('private user must exists')

        const privateChat = await privatesModel.create({
            users: [user, privateUser]
        })

        user.privateUsers.push(privateChat._id)
        await user.save()
        privateUser.privateUsers.push(privateChat._id)
        await privateUser.save()

        return privateChat._id
    }
}