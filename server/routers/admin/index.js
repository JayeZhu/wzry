module.exports = app => {
  const express = require('express');
  const router = express.Router();

  app.use(express.json());
  app.use(require('cors')())

  const Category = require('../../models/Category');
  router.get('/categories', async (req, res) => {
    const items = await Category.find();
    res.send(items);
  });

  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });

  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  });

  app.use('/admin/api', router);
}