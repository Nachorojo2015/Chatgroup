import { UserRepository } from "../database/userRepository.js"

export const updateAvatar = async (req, res) => {
    const { user } = req.session

    if (!user) return res.status(401).send('User not authorized')

    const { url } = req.body
    const { _id } = user

    try {
        const avatar = await UserRepository.updateAvatar({ _id, url })
        res.send({ avatar })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const getUser = async (req, res) => {
    const { user } = req.session

    if (!user) return res.status(401).send('User not authorized')

    const { _id } = user

    try {
        const user = await UserRepository.getUser({ _id })
        res.send({ user })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const searchUsersByUsername = async (req, res) => {
    const { user } = req.session

    if (!user) return res.status(401).send('User not authorized')

    const { username } = req.params
    const { _id } = user

    try {
        const users = await UserRepository.searchUsersByUsername({ username, _id })
        res.send({ users })
    } catch (error) {
        res.status(400).send(error.message)
    }
}