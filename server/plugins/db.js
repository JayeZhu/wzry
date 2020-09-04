module.exports = app => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/wzry', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  require('require-all')(__dirname + '/../models') // 引用 models 里面所有文件
  
}