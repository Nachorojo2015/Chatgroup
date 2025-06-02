import mongoose from "mongoose";
import { MONGO_URI } from "./variables.js";
import { config } from "dotenv";

config()

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
  console.log('Database is connected')
})

mongoose.connection.on('error', (error) => {
  console.log('Error in database', error)
})