import express from 'express'
import { FRONTEND_DOMAIN, PORT } from './config/variables.js'
import './config/connectDatabase.js'
import { authRouter } from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import { verifyToken } from './middlewares/verifyToken.js'
import cors from "cors"
import http from "http"
import { Server } from 'socket.io'
import { userRouter } from './routes/userRoute.js'
import { groupRouter } from './routes/groupRoute.js'
import { messageRouter } from './routes/messageRoute.js'
import { privateRouter } from './routes/privateRoute.js'
import { MessagesRepository } from './database/messageRepository.js'

const app = express()
app.use(cors({ origin: [FRONTEND_DOMAIN], credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(verifyToken)

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/group', groupRouter)
app.use('/messages', messageRouter)
app.use('/private', privateRouter)

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: FRONTEND_DOMAIN,
    credentials: true
  }
})


io.on('connection', socket => {
  console.log('Client connected', socket.id)

  socket.on('loginUser', (userId) => {
    socket.join(userId)
  })

  socket.on('updateUser', (userId) => {
    io.to(userId).emit('update', (userId));
  })

  // Recive message
  socket.on('message', async ({ message }) => {
    const newMessage = await MessagesRepository.createMessage({ message })
    io.emit('new-message', { newMessage })
  })

  socket.on('disconnect', () => {
    console.log(`Socket id ${socket.id} disconnect`)
  })
})

server.listen(PORT, () => {
  console.log('App running on port', PORT)
})

