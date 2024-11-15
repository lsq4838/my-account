const { DBHOST, DBPORT, DBNAME } = require("../config");
const mongoose = require("mongoose");

module.exports = function(success, error) {
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败")
    }
  }

  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  mongoose.connection.once("open", () => {
    success();
  });

  mongoose.connection.on("error", () => {
    error();
  });

  mongoose.connection.on("close", () => {
    console.log("连接关闭")
  });
}