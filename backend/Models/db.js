const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_CONN;

function connectToMongoDB(mongoUrl) {
  return mongoose.connect(mongoUrl)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err);
    });
}

connectToMongoDB(mongoUrl);