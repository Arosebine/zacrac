const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DATABASE_URL_PROD);
    console.log("Connected to Zacrac database");
  } catch (error) {
    console.log("Error connecting to Zacrac database");
  }
};

module.exports = connectDB;
