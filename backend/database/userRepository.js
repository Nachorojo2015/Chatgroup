import { usersModel } from "../models/Users.js";
import { ValidateError } from "../errors/ValidateError.js";
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from "../config/variables.js";
import { MissingFieldError } from "../errors/MissingFieldError.js";
import { InvalidLength } from "../errors/InvalidLength.js";
import { getFileUrl, uploadFile } from "../config/firebaseConfig.js";
import fs from "fs"
import { privatesModel } from "../models/Private.js";

export class UserRepository {
    static async register({ email, fullname, username, password }) {
        if (!email || !fullname || !username || !password) throw new MissingFieldError('all fields must exists')

        if (username.length < 4) throw new InvalidLength('username must be at least 4 characters long')
        
        if (password.length < 6) throw new InvalidLength('password must be at least 6 characteres long')

        if (typeof username !== 'string') throw new TypeError('username must be an string')
        
        if (typeof password !== 'string') throw new TypeError('password must be an string')
        
        const user = await usersModel.findOne({ username: `@${username}` })
        if (user) throw new ValidateError('user must not exists')

        const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))

        const newUser = await usersModel.create({
            email,
            fullname,
            username: `@${username}`,
            password: hashedPassword
        })

        return newUser._id
    }

    static async login({ username, password }) {
        if (!username || !password) throw new MissingFieldError('all fields must exists')

        if (username.length < 4) throw new InvalidLength('Username must be at least 4 characters long')
        
        if (password.length < 6) throw new InvalidLength('Password must be at least 6 characteres long')
        
        if (typeof username !== 'string') throw new TypeError('username must be an string')
                
        if (typeof password !== 'string') throw new TypeError('password must be an string')

        const user = await usersModel.findOne({ username: `@${username}`})
        if (!user) throw new ValidateError('user must exists')

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new ValidateError('password is not valid')

        const { _id } = user

        return { _id }
    }

    static async findByEmail(email) {
        if (!email) throw new ValidateError('email must exists')

        if (typeof email !== 'string') throw new TypeError('email must be an string')

        const user = await usersModel.findOne(
            {
                email
            },
            {
                _id: 1,
                email: 1,
                fullname: 1,
                password: 0
            }
        )
        
        if (!user) throw new ValidateError('user email is not registered')

        return user
    }

    static async resetPassword(newPassword, { email }) {
        if (!newPassword) throw new ValidateError('password must exists')

        if (typeof newPassword !== 'string') throw new TypeError('password must be an string') 

        const user = await usersModel.findOne({ email })
        if (!user) throw new ValidateError('user must exists')

        const hashedPassword = await bcrypt.hash(newPassword, parseInt(SALT_ROUNDS))
        
        user.password = hashedPassword
        const newUser = await user.save()

        const { _id } = newUser

        return _id
    }

    static async updateAvatar({ _id, file }) {
        const user = await usersModel.findById(_id)
        if (!user) throw new ValidateError('user must exists')

        if (!file) throw new Error('File not include')

        const destination = `avatars/${user.username}.jpeg`

        await uploadFile(file.path, destination)

        const fileUrl = await getFileUrl(destination)

        user.avatar = fileUrl
        await user.save()

        fs.unlinkSync(file.path)

        return user
    }

    static async getUser({ _id }) {
        const user = await usersModel.findById(
            {
                _id
            },
            {
                fullname: 1,
                username: 1,
                avatar: 1,
                groups: 1,
                privateUsers: 1,
                _id: 1
            }
        )
        .populate({
            path: 'groups',
            populate: [
              {
                path: 'creator',
                select: 'username'
              },
              {
                path: 'members',
                select: 'username avatar'
              }
            ]
        })
        .populate({
            path: 'privateUsers',
            populate: {
                path: 'users',
                select: 'avatar username fullname',
            }
        })

        if (!user) throw new ValidateError('user must exists')

        return user
    }

    static async searchUsersByUsername({ username, _id }) {
        if (!username) throw new MissingFieldError('missing field username')
        
        if (username.length < 4) throw new InvalidLength('Username must be at least 4 characters long')
        
            const regex = new RegExp(username, 'i'); // Expresión regular para buscar coincidencias en el username
            
            const users = await usersModel.find(
                { 
                  username: { $regex: regex },
                  _id: { $ne: _id }
                },
                { 
                  username: 1, 
                  fullname: 1, 
                  avatar: 1, 
                  _id: 1,
                }
            )
          
        if (!users.length) throw new InvalidLength('Not users found')

        return users
    }
}