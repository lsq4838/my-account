const mongoose = require("mongoose");

const MovieSchame = new mongoose.Schema({
  title: String,
  director: String,
  description: String
});

const MovieModel = mongoose.model("movies", MovieSchame);

module.exports = MovieModel;