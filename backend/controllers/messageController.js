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

export const uploadFile = async (req, res) => {
  const file = req.file
  if (!file) return res.status(400).send('No files include')

  const { user } = req.session
  if (!user) return res.status(401).send('User unauthorized')

  try {
    const fileUrl = await MessagesRepository.uploadFile({ file })
    res.send({ fileUrl })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error uploading file')
  }
}