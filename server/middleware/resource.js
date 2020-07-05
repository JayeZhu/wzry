module.exports = options => {
  return async (req, res, next) => {
    // 添加中间件，动态获取到模型
    // 通过 inflection 的 classfy 将 从父级获取的参数 转为大写单数，即 模型名
    const modelName = require('inflection').classify(req.params.resource);
    // 动态获取模型,将其挂在在 req 上，表明请求这个模型
    req.Model = require(`../models/${modelName}`);
    next(); // 执行下一步
  }
};