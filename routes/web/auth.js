var express = require('express');
var router = express.Router();
const AuthModel = require("../../models/AuthModel");
const md5 = require("md5");

// 注册页面
router.get("/reg", (req, res) => {
  res.render("auth/reg");
})

// 注册操作
router.post('/reg', (req, res) => {
  // 做表单验证 TODO

  // 获取请求体数据
  AuthModel.create({...req.body, password: md5(req.body.password)}).then(data => {
    res.render("success", { msg: "注册成功", url: "/login" });
  }).catch(err => {
    res.status(500).send("注册失败");
  })
});

// 登录页面
router.get("/login", (req, res) => {
  res.render("auth/login");
})

// 登录操作
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // 查询
  AuthModel.findOne({username, password: md5(password)}).then(data => {
    console.log(data);
    // 如果 data 为 null，说明用户名或密码错误
    if (!data) {
      return res.send("用户名或密码错误");
    }
    // 设置session
    req.session.username = data.username;
    req.session._id = data._id;

    res.render("success", { msg: "登录成功", url: "/account" })
  }).catch(err => {
    res.status(500).send("登录，请稍后重试~");
  })
})

// 退出登录 预防CSRF跨站请求伪造攻击 需将请求方式改为post 
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.render("success", { msg: "退出成功", url: "/login" })
  })
})

module.exports = router;
