require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/notFound");

// routes
const tasksRoute = require("./routes/tasks");
//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasksRoute);
app.use(notFound);
// custom error handler
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT;
//! DATABASE CONNECTION
// if connection to DB is successful then start the server otherwise kill the process
const start = () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}..`);
    });
    console.log("Connection to DB Successful");
  } catch (error) {
    console.log(error);
  }
};

start();
