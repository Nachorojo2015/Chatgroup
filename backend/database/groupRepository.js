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
            _id: 0
         }
        ).populate({
            path: 'creator',
            select: 'username'
        })

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
}