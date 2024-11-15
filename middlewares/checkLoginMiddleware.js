module.exports = (req, res, next) => {
  // 检测用户是否登录，没有登录则跳转登录页
  if (!req.session.username) {
    return res.redirect("/login");
  }
  next();
}