const mongoose = require("mongoose");

const AccountSchame = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: Date,
  type: {
    type: Number,
    default: -1
  },
  amount: {
    type: Number,
    required: true
  },
  remarks: String
})

const AccountModel = mongoose.model("accounts", AccountSchame);

module.exports = AccountModel;