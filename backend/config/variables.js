import { config } from "dotenv"

config()

export const {
  PORT,
  DATABASE,
  SALT_ROUNDS,
  SECRET_JWT_KEY,
  FRONTEND_DOMAIN,
  API_KEY_RESEND,
  GOOGLE_APPLICATON_CREDENTIALS,
  FIREBASE_STORAGE_BUCKET
} = process.env
