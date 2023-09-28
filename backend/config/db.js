const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      // 'mongodb://mongodb:27017/mern-proj',
      // process.env.MONGO_URI_LOCAL,
      'mongodb+srv://jubair421:mango123@cluster0.ap8mvgi.mongodb.net/',
      // process.env.MONGO_URI_DOCKER,
    )
  } catch (error) {
    console.log(error)
    // process.exit(1)
  }
}

module.exports = connectDB