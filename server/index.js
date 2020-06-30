const express = require('express');

const app = express();

require('./routers/admin')(app);
require('./plugins/db')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000');
})