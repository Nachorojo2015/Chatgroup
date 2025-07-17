import { FRONTEND_DOMAIN, SECRET_JWT_KEY } from "../config/variables.js"
import { UserRepository } from "../database/userRepository.js"
import jwt from "jsonwebtoken"
import { Resend } from "resend"
import { API_KEY_RESEND } from "../config/variables.js"

const resend = new Resend(API_KEY_RESEND) // Para enviar correos

export const registerUser = async (req, res) => {
  const { email, fullname, username, password } = req.body

  try {
    const idUser = await UserRepository.register({ email, fullname, username, password })
    res.send({ idUser })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(user, SECRET_JWT_KEY, { expiresIn: '3d' })
    res
      .cookie('access_token', token, {
      httpOnly: true, // No puede ser accedida mediante JavaScript
      secure: true, // La cookie solo puede ser accedida desde https | Desde el modo desarrollo no se puede porque solo contamos con http
      sameSite: 'none', // No sera accedida desde el mismo dominio, ya que tenemos diferentes servidores
      maxAge: 3 * 24 * 60 * 60 * 1000,
    })
      .send({ user })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const sendMailResetPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await UserRepository.findByEmail({ email })

    const userPayload = {
      _id: user._id.toString(),  // Convertimos el ObjectId a string
      email: user.email,
      fullname: user.fullname,
    }

    const token = jwt.sign(userPayload, SECRET_JWT_KEY, { expiresIn: '15m' })


    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Password Reset Request for Chatgroup',
      html: `
      <section style="background-color: whitesmoke; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px;font-family: tahoma">

        <article style="background-color: white; padding: 20px; border-radius: 12px; min-width: 300px">

          <span>✌️</span>

          <p style="font-weight: bold">Chatgroup</p>

          <p>Hey ${user.fullname},</p>

          <p>Your Chatgroup password can be reset clicking the button below. If you did not request a new password, please ignore this email.</p>

          <a href='${FRONTEND_DOMAIN}/reset' style="background-color: blue; padding: 12px; border-radius: 4px; color: #fff; box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);display: inline-block; text-decoration: none">
          Reset password
          </a>
        </article>

      </section>
      `
    })

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })
      .json({ data })
  } catch (error) {
    res.status(400).send(error.message)
  }  
}

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body

  const { user } = req.session

  if (!user) return res.status(401).send('Time expired')

  try {
    const idUser = await UserRepository.resetPassword(newPassword, user)
    res.json({ idUser })
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const protectedUser = (req, res) => {
  const { user } = req.session

  if (!user) return res.status(401).send('user not authorized')

  res.send({ user })
}

export const closeSession = (req, res) => {
  res
    .clearCookie('access_token')
    .send('Logout successfull')
}