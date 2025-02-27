import { UserRepository } from "../database/userRepository.js"

export const updateAvatar = async (req, res) => {
    const file = req.file
    if (!file) return res.status(400).send('Not file include')

    const { user } = req.session
    if (!user) return res.status(401).send('User not authorized')

    const { _id } = user

    try {
      const idUser = await UserRepository.updateAvatar({ _id, file })
      res.send({ idUser })
    } catch (error) {
      console.log(error)
      res.status(500).send('Error uploading avatar')
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

export const blockUser = async (req, res) => {
    const { user } = req.session

    if (!user) return res.status(401).send('User not authorized')

    const { username } = req.params
    const { _id } = user

    try {
      const userBlock = await UserRepository.blockUser({ username, _id })
      res.send({ userBlock })
    } catch (error) {
      res.status(400).send(error.message)
    }
}

export const unlockUser = async (req, res) => {
  const { user } = req.session

  if (!user) return res.status(401).send('User not authorized')

  const { username } = req.params
  const { _id } = user

  try {
    const userUnlock = await UserRepository.unlockUser({ username, _id })
    res.send({ userUnlock })
  } catch (error) {
    res.status(400).send(error.message)
  }
}