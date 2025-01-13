import { usersModel } from "../models/Users.js";
import { ValidateError } from "../errors/ValidateError.js";
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from "../config/variables.js";
import { MissingFieldError } from "../errors/MissingFieldError.js";
import { InvalidLength } from "../errors/InvalidLength.js";

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

        const newUser = {
            _id: user._id,
            fullname: user.fullname,
            username: `@${username}`,
            avatar: user.avatar,
            groups: user.groups,
            privateChats: user.privateChats
        }

        return newUser
    }

    static async findByEmail(email) {
        if (!email) throw new ValidateError('email must exists')

        if (typeof email !== 'string') throw new TypeError('email must be an string')

        const user = await usersModel.findOne({ email })
        if (!user) throw new ValidateError('user email is not registered')

        const newUser = {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        }

        return newUser
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
}