const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select:false
  },
  cpassword: {
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now, 
  }
});

module.exports = mongoose.model("users", Schema);
