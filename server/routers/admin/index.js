module.exports = app => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true // 导入父级参数到子级配置
  });
  const jwt = require('jsonwebtoken'); // 引入jwt
  const assert = require('http-assert'); // 引入状态码 相关包
  const AdminUser = require('../../models/AdminUser'); // 引入管理员模型

  app.use(express.json());
  app.use(require('cors')());

  // 登录校验中间件
  const authMiddleware =  require('../../middleware/auth');
  const resourceMiddleware =  require('../../middleware/resource');

  // 资源列表
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

  // 添加资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 修改资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除资源
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), async (req, res, next) => {
    // 添加中间件，动态获取到模型
    // 通过 inflection 的 classfy 将 从父级获取的参数 转为大写单数，即 模型名
    const modelName = require('inflection').classify(req.params.resource);
    // 动态获取模型,将其挂在在 req 上，表明请求这个模型
    req.Model = require(`../../models/${modelName}`);
    next(); // 执行下一步
  }, router);

  // 导入multer，建立文档中间件 upload
  const multer = require('multer');
  // 地址使用绝对地址
  const upload = multer({ dest: __dirname + '/../../uploads' });

  // 加入中间件， single代表单个文件， file是接收到的文件
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file);
  });

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password'); // 通过 username 寻找 user, select添加查找password
    assert(user, 422, '用户不存在');
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   });
    // }

    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password); // 使用 bcrypt 的 校验 明文和密文
    assert(isValid, 422, '密码错误');
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   });
    // }

    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'));
    res.send({ token });
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
}