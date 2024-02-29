const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    task:{
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model("Task",Schema);