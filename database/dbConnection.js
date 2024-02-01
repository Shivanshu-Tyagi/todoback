 const mongoose = require('mongoose')
require('dotenv').config();
 const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL , {
        dbName: "TodoTask"
    })
    console.log("connected to database" , connection.connection.host);
  } catch (error) {
    console.log("failed to connect" , error);
    throw error
  }
}

module.exports = connectDB;