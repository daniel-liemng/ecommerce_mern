const mongoose = require("mongoose");
// require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"));

  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
  });
};

module.exports = connectDB;
