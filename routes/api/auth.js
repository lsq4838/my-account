var express = require('express');
var router = express.Router();
const AuthModel = require("../../models/AuthModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { secret } = require('../../config');

// 登录页面
router.get("/login", (req, res) => {
  res.render("auth/login");
})

// 登录操作
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // 查询
  AuthModel.findOne({username, password: md5(password)}).then(data => {
    // 如果 data 为 null，说明用户名或密码错误
    if (!data) {
      return res.json({
        code: "2002",
        msg: "用户名或密码错误~",
        data: null
      })
    }
    // 生成 token
    const token = jwt.sign({
      username: data.username,
      _id: data._id
    }, secret, {
      expiresIn: 7 * 24 * 60 * 60
    })

    res.json({
      code: "0000",
      msg: "登录成功",
      data: token
    })
  }).catch(err => {
    // res.status(500).send("登录，请稍后重试~");
    res.json({
      code: "2001",
      msg: "数据库读取失败~",
      data: null
    })
  })
})


module.exports = router;
