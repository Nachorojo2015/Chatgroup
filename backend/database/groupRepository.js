import { MissingFieldError } from "../errors/MissingFieldError.js";
import { ValidateError } from "../errors/ValidateError.js";
import { groupsModel } from "../models/Groups.js";
import { usersModel } from "../models/Users.js";

export class GroupRepository {
    static async createGroup({ name, picture, _id }) {
        const group = await groupsModel.create({
            name,
            picture,
            creator: _id,
            members: [_id],
            administrators: [_id]
        })

        const user = await usersModel.findById(_id)
        if (!user) throw new ValidateError('user must exists')

        user.groups.push(group._id)
        await user.save()

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

    static async editGroup({ _id, name, description, picture, visibility }) {
        const group = await groupsModel.findByIdAndUpdate(_id, {
            name,
            description,
            picture,
            visibility
        })

        if (!group) throw new ValidateError('The group dont exists')

        return group._id
    }

    static async joinGroup({ groupId, userId }) {
        const user = await usersModel.findById({ _id: userId })
        if (!user) throw new ValidateError('user dont exists')

        const group = await groupsModel.findById({ _id: groupId })
        if (!group) throw new ValidateError('group dont exists')

        if (group.members.includes(userId)) throw new Error('user must not exists in the group')

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
}