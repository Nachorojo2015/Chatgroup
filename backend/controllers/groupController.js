import { GroupRepository } from "../database/groupRepository.js"

export const createGroup = async (req, res) => {
    const { user } = req.session

    if (!user) return res.status(401).send('User not authorized')

    const { name, picture } = req.body
    const { _id } = user

    try {
        const idGroup = await GroupRepository.createGroup({ name, picture, _id })
        res.send({ idGroup })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const searchGroupByName = async (req, res) => {
    const { name } = req.params

    try {
        const groups = await GroupRepository.searchGroupsByName({ name })
        res.send({ groups })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const deleteGroup = async (req, res) => {
    const { _id } = req.params

    try {
      const idGroup = await GroupRepository.deleteGroup({ _id })
      res.send({ idGroup })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const editGroup = async (req, res) => {
    const { _id } = req.params
    const { name, description, picture, visibility } = req.body

    try {
      const idGroup = await GroupRepository.editGroup({ _id, name, description, picture, visibility })
      res.send({ idGroup })
    } catch (error) {
      res.status(400).send(error.message)
    }
}

export const joinGroup = async (req, res) => {
    const { user } = req.session
    const { _id } = req.params

    if (!user) return res.status(401).send('User not authorized')

    try {
      const idGroup = await GroupRepository.joinGroup({ groupId: _id, userId: user._id })
      res.send({ idGroup })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const leaveGroup = async (req, res) => {
    const { user } = req.session
    const { _id } = req.params

    if (!user) return res.status(401).send('User not authorized')

    try {
      const idGroup = await GroupRepository.leaveGroup({ groupId: _id, userId: user._id })
      res.send({ idGroup })
    } catch (error) {
      res.status(400).send(error.message)
    }
}