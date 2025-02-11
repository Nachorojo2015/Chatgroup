import mongoose from "mongoose";
import { DATABASE } from "./variables.js";
import { config } from "dotenv";

config()

mongoose.connect(DATABASE)

mongoose.connection.once('open', () => {
  console.log('Database is connected to', DATABASE)
})

mongoose.connection.on('error', (error) => {
  console.log('Error in database', error)
})