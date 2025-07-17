const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 提供node_modules目录的访问
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// 提供静态文件目录
app.use(express.static(path.join(__dirname, 'files')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});