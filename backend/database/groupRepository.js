import { getFileUrl, uploadFile } from "../config/firebaseConfig.js";
import { MissingFieldError } from "../errors/MissingFieldError.js";
import { ValidateError } from "../errors/ValidateError.js";
import { groupsModel } from "../models/Groups.js";
import { usersModel } from "../models/Users.js";
import fs from "fs"
import crypto from "crypto"

export class GroupRepository {
    static async createGroup({ name, file, _id }) {
        const randomUUID = crypto.randomUUID()
        const fileType = file.mimetype.split('/').pop()
        const destination = `groups/${randomUUID}.${fileType}`

        await uploadFile(file.path, destination)

        const fileUrl = await getFileUrl(destination)

        const group = await groupsModel.create({
            name,
            picture: fileUrl,
            creator: _id,
            members: [_id],
            administrators: [_id]
        })

        const user = await usersModel.findById(_id)
        if (!user) throw new ValidateError('user must exists')

        user.groups.push(group._id)
        await user.save()

        fs.unlinkSync(file.path)

        return group._id
    }

    static async searchGroupsByName({ name }) {
        if (!name) throw new MissingFieldError('Field name must exists')

        const regex = new RegExp(name, 'i')

        const groups = await groupsModel.find(
         {
           name: { $regex: regex },
           visibility: { $ne: 'Private'}
         },
         {
            name: 1,
            members: 1,
            picture: 1,
            creator: 1,
            _id: 1
         }
        ).populate([
            {
                path: 'creator',
                select: 'username'
            },
            {
                path: 'members',
                select: 'username'
            }
        ])

        return groups
    }

    static async deleteGroup({ _id }) {
        const group = await groupsModel.findByIdAndDelete({ _id })

        return group._id
    }

    static async editGroup({ _id, name, description, file, visibility }) {

        let fileUrl

        if (!file) {
          const group = await groupsModel.findById(_id)
          fileUrl = group.picture
        } else {
          const randomUUID = crypto.randomUUID()
          const fileType = file.mimetype.split('/').pop()
          const destination = `groups/${randomUUID}.${fileType}`

          await uploadFile(file.path, destination)

          fileUrl = await getFileUrl(destination)

          fs.unlinkSync(file.path)
        }

        const group = await groupsModel.findByIdAndUpdate(_id, {
            name,
            description,
            picture: fileUrl,
            visibility
        })

        if (!group) throw new ValidateError('The group dont exists')

        return group._id
    }

    static async joinGroup({ groupId, userId }) {
        const user = await usersModel.findById({ _id: userId })
        if (!user) throw new ValidateError('User dont exists')

        const group = await groupsModel.findById({ _id: groupId })
        if (!group) throw new ValidateError('Group dont exists')

        if (group.members.includes(userId)) throw new Error('The user is already in this group')

        if (group.blockedUsers.includes(userId)) throw new Error('You are blocked to this group')

        user.groups.push(group)
        group.members.push(user)

        await user.save()
        await group.save()

        return group._id
    }

    static async leaveGroup({ groupId, userId }) {
        const user = await usersModel.findById({ _id: userId })
        if (!user) throw new ValidateError('user dont exists')

        const group = await groupsModel.findById({ _id: groupId })
        if (!group) throw new ValidateError('group dont exists')

        if (!group.members.includes(userId)) throw new Error('user must stay in the group')

        user.groups = user.groups.filter(id => id.toString() !== groupId)

        await user.save()

        group.members = group.members.filter(id => id.toString() !== userId)

        await group.save()

        return group._id
    }

    static async blockUser({ _id, idUser }) {
        const user = await usersModel.findById({ _id: idUser })
        if (!user) throw new ValidateError('user must exists')

        const group = await groupsModel.findById(_id)
        if (!group) throw new ValidateError('group must exists')

        if (group.blockedUsers.includes(idUser)) throw new Error('The user is already block')

        if (!group.members.includes(idUser)) throw new Error('The user is not into the group')

        group.blockedUsers.push(idUser)
        group.members = group.members.filter(id => id.toString() !== idUser)
        await group.save()

        user.groups = user.groups.filter(id => id.toString() !== _id)
        await user.save()

        return user.username
    }

    static async unlockUser({ _id, idUser }) {
        const user = await usersModel.findById({ _id: idUser })
        if (!user) throw new ValidateError('user must exists')

        const group = await groupsModel.findById(_id)
        if (!group) throw new ValidateError('group must exists')

        if (!group.blockedUsers.includes(idUser)) throw new Error('The user is not block')

        group.blockedUsers = group.blockedUsers.filter(id => id.toString() !== idUser)
        group.members.push(idUser)
        await group.save()

        user.groups.push(_id)
        await user.save()

        return user.username
    }
}