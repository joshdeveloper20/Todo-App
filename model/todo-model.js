const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter todo name"],
    trim: true,
    maxlength: [30, "name cannot be more than 30 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
