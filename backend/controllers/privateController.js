import { PrivateRepository } from "../database/privateRepository.js"

export const createPrivateChat = async (req, res) => {
    const { user } = req.session
    if (!user) return res.status(401).send('User not authorized')

    const { idUserPrivate } = req.params

    try {
      const idPrivateChat = await PrivateRepository.createPrivateChat({ idUserPrivate, userId: user._id})
      res.send({ idPrivateChat })
    } catch (error) {
      res.status(500).send(error.message)
    }
}