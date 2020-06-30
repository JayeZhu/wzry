module.exports = app => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true // 导入父级参数到子级配置
  });

  app.use(express.json());
  app.use(require('cors')());

  router.get('/', async (req, res) => {
    // const items = await req.Model.find().populate('parent'); // 通过 populate 查询 字段 的 表的全部信息
    // 添加查询选项
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      // 选择性 使用 populate
      queryOptions.populate = 'parent';
    }
    const items = await req.Model.find().setOptions({ queryOptions }); // 利用setOptions传入 查询选项
    res.send(items);
  });

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // 添加中间件，动态获取到模型
    // 通过 inflection 的 classfy 将 从父级获取的参数 转为大写单数，即 模型名
    const modelName = require('inflection').classify(req.params.resource);
    // 动态获取模型,将其挂在在 req 上，表明请求这个模型
    req.Model = require(`../../models/${modelName}`);
    next(); // 执行下一步
  }, router);
}