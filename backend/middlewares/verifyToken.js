import jwt from "jsonwebtoken"
import { SECRET_JWT_KEY } from "../config/variables.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    let data = null
    req.session = { user: null }

    try {
      data = jwt.verify(token, SECRET_JWT_KEY)
      req.session.user = data
    } catch {}

    next()
}