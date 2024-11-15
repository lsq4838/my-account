const { secret } = require("../config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("token")
  if (!token) {
    return res.json({
      code: "2003",
      msg: "token缺失",
      data: null
    })
  }
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token校验失败",
        data: null
      })
    }
    // 保存用户数据
    req.user = data;

    next();
  })
}