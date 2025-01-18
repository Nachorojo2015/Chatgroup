import express from 'express'
import { FRONTEND_DOMAIN, PORT } from './config/variables.js'
import './database/connect.js'
import { authRouter } from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import { verifyToken } from './middlewares/verifyToken.js'
import cors from "cors"
import http from "http"
import { Server } from 'socket.io'
import { userRouter } from './routes/userRoute.js'


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: [FRONTEND_DOMAIN], credentials: true }))
app.use(verifyToken)

app.use('/auth', authRouter)
app.use('/user', userRouter)

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: FRONTEND_DOMAIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})

app.listen(PORT, () => {
  console.log('App running on port', PORT)
})