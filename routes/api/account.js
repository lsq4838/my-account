var express = require('express');
var router = express.Router();
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");
const checkToken = require("../../middlewares/checkToken");

/* 账户列表 */
router.get('/account', checkToken, function(req, res, next) {
    console.log(req.user);
    AccountModel.find().sort({date: -1}).exec().then(data => {
      // res.render("accountList", {list: data, moment});
      res.json({
        code: "0000",
        msg: "读取成功",
        data
      })
    }).catch(err => {
      // res.status(500).send("查询失败")
      res.json({
        code: "1001",
        msg: "读取失败",
        data: null
      })
    })
});

/* 添加账户 */
router.get('/account/create', checkToken, function(req, res, next) {
  res.render("accountCreate");
 });

 /* 新增记录 */
router.post('/account', checkToken, (req, res) => {
  // const id = shortid.generate();
  // db.get("accounts").unshift({ id, ...req.body }).write();
  AccountModel.create({
    ...req.body,
    date: moment(req.body.date).toDate()
  }).then((data) => {
    // res.render("success", { msg: "添加成功", url: "/account" })
    res.json({
      code: "0000",
      msg: "新增成功",
      data
    })
  }).catch((err) => {
    // res.status(500).send("新增失败")
    res.json({
      code: "1002",
      msg: "新增失败",
      data: null
    })
  })
});

 /* 删除记录 */
 router.delete('/account/:id', checkToken, (req, res) => {
  const id = req.params.id;
  // db.get("accounts").remove({id}).write();
  AccountModel.deleteOne({_id: id}).then(data => {
    // res.render("success", { msg: "删除成功", url: "/account" })
    res.json({
      code: "0000",
      msg: "删除成功",
      data: {}
    })
  }).catch(err => {
    // res.status(500).send("删除失败")
    res.json({
      code: "1003",
      msg: "删除失败",
      data: null
    })
  })
});

// 获取单个账单
router.get("/account/:id", checkToken, (req, res) => {
  const { id } = req.params;
  AccountModel.findById({ _id: id }).then(data => {
    res.json({
      code: "0000",
      msg: "获取成功",
      data
    })
  }).catch(err => {
    res.json({
      code: "1004",
      msg: "获取失败",
      data: null
    })
  })
})

// 更新单个账单
router.patch("/account/:id", checkToken, (req, res) => {
  const { id } = req.params;
  AccountModel.updateOne({ _id: id }, req.body).then(data => {
    // 查询
    AccountModel.findById(id).then(data => {
      res.json({
        code: "0000",
        msg: "更新成功",
        data
      })
    }).catch(err => {
      res.json({
        code: "1004",
        msg: "读取失败",
        data: null
      })
    })
  }).catch(err =>  {
    res.json({
      code: "1005",
      msg: "更新失败",
      data: null
    })
  })
})

module.exports = router;
