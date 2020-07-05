module.exports = options => {

  const jwt = require('jsonwebtoken');
  const AdminUser = require('../models/AdminUser');
  const assert = require('http-assert');
  return async (req, res, next) => {
    // 校验用户是否登录
    const token = String(req.headers.authorization || '').split(' ').pop(); // 获取 请求头里面的token
    assert(token, 401, '请先登录');
    const { id } = jwt.verify(token, req.app.get('secret')); // 通过token的 验证解析出token中的用户id
    assert(id, 401, '请先登录');
    req.user = await AdminUser.findById(id); // 在 AdminUser 里查询该ID,然后挂载到req上 
    assert(req.user, 401, '请先登录'); // 检验 报错
    await next(); // 同步 next()
  }
};