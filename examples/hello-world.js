// HiDog Hello World 示例
// 这是一个最简单的 HiDog 应用示例

const hidog = require('../src/index');

// 创建 HiDog 实例
const app = hidog.create({
  name: 'Hello World App',
  version: '1.0.0'
});

// 添加简单的路由
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, HiDog! 🐕',
    timestamp: new Date().toISOString(),
    version: app.version
  });
});

// 添加健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🐕 HiDog 应用运行在 http://localhost:${port}`);
  console.log('尝试访问以下端点:');
  console.log(`  - http://localhost:${port}/`);
  console.log(`  - http://localhost:${port}/health`);
});

module.exports = app;