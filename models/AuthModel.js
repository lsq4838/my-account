const mongoose = require("mongoose");

const AuthSchame = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String || Number,
    required: true
  }
})

const AuthModel = mongoose.model("users", AuthSchame);

module.exports = AuthModel;