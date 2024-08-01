const mongoose = require('mongoose');

async function dbConnect() {
  try {
    // try connecting to MongoDB with the .env URI
    const connection = await mongoose.connect(process.env.MONGODB_URI, {dbName: "jamoveo"})
    console.log(`MongoDB is connected :)`);

  } catch (error) {
    console.log(`MongoDB encountered a problem connecting :(`);
    console.error(error);
  }
}

module.exports = dbConnect