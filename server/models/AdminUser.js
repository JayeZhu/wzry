const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false, // 密码不可查，不显示
    set (val) {
    // 导入 bcrypt，使用 hashSync 使val 散列 10 代表散列指数
    return bcrypt.hashSync(val, 10)
  }}
});

module.exports = mongoose.model('AdminUser', schema);