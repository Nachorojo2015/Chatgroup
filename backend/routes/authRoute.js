import { Router } from "express";
import { closeSession, loginUser, protectedUser, registerUser, resetPassword, sendMailResetPassword } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post('/register', registerUser)
          .post('/login', loginUser)
          .get('/protected', protectedUser)
          .post('/email/forgot-password', sendMailResetPassword)
          .put('/email/reset-password', resetPassword)
          .post('/logout', closeSession)

export { authRouter }