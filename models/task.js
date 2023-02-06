const mongoose = require("mongoose");

//schema defines the structure for the document
//like types , validations etc
const TaskSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name must be provided"],
      trim: true,
      min: [3, "Name Cannot be less than 3 chars"],
      max: [12, "Name Cannot me more  than 12 chars"],
   },
   completed: {
      type: Boolean,
      default: false,
   },
});
// model is a wrapper to the schema which provides interface to the DATABASE
// using model we will able to perform CRUD opeartions on our documents
module.exports = mongoose.model("Task", TaskSchema);
