const express = require('express');
const path = require('path');

module.exports = () => {
  const app = express();
  const port = 3000;


  // 静态文件服务
  app.use(express.static(path.join(__dirname, 'dist')));

  // 路由
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  // 启动服务器
  app.listen(port, () => {
    console.log(`server starting http://localhost:${port}`);
  });
}