import { MessagesRepository } from "../database/messageRepository.js"

export const getMessages = async (req, res) => {
    const { id } = req.params

    try {
      const messages = await MessagesRepository.getMessages({ id })
      res.send({ messages })
    } catch (error) {
      res.status(400).send(error.message)
    }
}