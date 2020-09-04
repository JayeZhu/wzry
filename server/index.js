const express = require('express');

const app = express();

app.set('secret', '123dewdwfwe'); // 全局设置 jwt所需的 秘钥

require('./routers/admin')(app);
require('./routers/web')(app);
require('./plugins/db')(app);

app.use('/uploads', express.static(__dirname + '/uploads')); // 托管静态文件

app.listen(3000, () => {
  console.log('http://localhost:3000');
})