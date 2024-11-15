var express = require('express');
var router = express.Router();
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");

// 导入检测用户是否登录的中间件
const checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");

// 路由首页
router.get("/", (req, res) => {
  res.redirect("/account");
})

/* 账户列表 */
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  // const accounts = db.get("accounts").value();
  AccountModel.find().sort({date: -1}).exec().then(data => {
    res.render("accountList", {list: data, moment});
  }).catch(err => {
    res.status(500).send("查询失败")
  })
});

/* 添加账户 */
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render("accountCreate");
 });

 /* 新增记录 */
router.post('/account', checkLoginMiddleware, (req, res) => {
  // const id = shortid.generate();
  // db.get("accounts").unshift({ id, ...req.body }).write();
  AccountModel.create({
    ...req.body,
    date: moment(req.body.date).toDate()
  }).then((data) => {
    res.render("success", { msg: "添加成功", url: "/account" })
  }).catch((err) => {
    res.status(500).send("新增失败")
  })
});

 /* 删除记录 */
 router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  const id = req.params.id;
  // db.get("accounts").remove({id}).write();
  AccountModel.deleteOne({_id: id}).then(data => {
    res.render("success", { msg: "删除成功", url: "/account" })
  }).catch(err => {
    res.status(500).send("删除失败")
  })
});

module.exports = router;
