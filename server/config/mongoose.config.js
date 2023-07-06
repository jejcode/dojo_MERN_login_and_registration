// const mongoose = require('mongoose')
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Established a connection to the database");

    mongoose.connection.on("error", () => {
      throw new Error("Could not connect to DB.");
    });
  } catch (err) {}
};

export default dbConnect;
