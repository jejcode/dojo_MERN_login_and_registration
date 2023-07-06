import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import userRouter from "./routes/user.routes.js";

const app = express();
dotenv.config();

// require('./config/mongoose.config')
// require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.DB_ORIGIN }));

// direct routes need to come after middleware
app.use('/api', userRouter);
// const myFirstSecret = process.env.FIRST_SECRET_KEY
const serverStart = async () => {
  try {
    await dbConnect();
    const PORT = process.env.DB_PORT;
    app.listen(PORT, () => console.log("Database is loaded."));
  } catch (err) {
    console.log(err);
  }
};

await serverStart()
