# HiDog 快速开始指南

这个文档将帮助您快速开始使用 HiDog 项目。

## 第一步：环境准备

### 系统要求

- Node.js >= 14.0.0
- npm >= 6.0.0  
- Git

### 安装检查

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本  
npm --version

# 检查 Git
git --version
```

## 第二步：获取项目

```bash
# 克隆项目
git clone https://github.com/peacezha/hidog.git

# 进入项目目录
cd hidog

# 运行自动设置脚本
./scripts/setup.sh
```

## 第三步：运行您的第一个应用

### 方式一：使用示例应用

```bash
# 运行 Hello World 示例
node examples/hello-world.js
```

然后在浏览器中访问 `http://localhost:3000`

### 方式二：运行 API 示例

```bash
# 运行 API 示例
node examples/api-example.js
```

然后测试 API：

```bash
# 获取所有狗狗信息
curl http://localhost:3001/api/dogs

# 添加新的狗狗
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"小白","breed":"比熊","age":1}' \
  http://localhost:3001/api/dogs
```

## 第四步：创建您自己的应用

创建一个新文件 `my-app.js`：

```javascript
const hidog = require('./src/index');

// 创建应用实例
const app = hidog.create({
  name: '我的 HiDog 应用',
  version: '1.0.0'
});

// 添加自定义路由
app.get('/hello/:name', (req, res) => {
  res.json({
    message: `你好，${req.params.name}! 🐕`,
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
app.listen(3000, () => {
  console.log('🐕 我的应用已启动！');
});
```

运行您的应用：

```bash
node my-app.js
```

## 第五步：了解配置

HiDog 支持多种配置方式：

### 1. 环境变量

```bash
export NODE_ENV=development
export PORT=3000
export HIDOG_LOG_LEVEL=debug
```

### 2. 配置文件

编辑 `config/development.json`：

```json
{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "logging": {
    "level": "debug",
    "console": true
  }
}
```

### 3. 代码中配置

```javascript
const app = hidog.create({
  name: '我的应用',
  config: './path/to/my-config.json'
});
```

## 第六步：开发和测试

### 开发模式

```bash
# 安装开发依赖
npm install

# 启动开发服务器（自动重载）
npm run dev
```

### 运行测试

```bash
# 运行所有测试
npm test

# 运行测试并查看覆盖率
npm run test:coverage
```

### 代码检查和格式化

```bash
# 代码检查
npm run lint

# 自动修复代码风格
npm run lint:fix

# 格式化代码
npm run format
```

## 第七步：构建和部署

### 构建项目

```bash
npm run build
```

### 生产环境运行

```bash
# 设置生产环境
export NODE_ENV=production

# 启动生产服务器
npm start
```

### Docker 部署

```bash
# 构建 Docker 镜像
docker build -t hidog-app .

# 运行容器
docker run -p 3000:3000 hidog-app
```

## 常见问题

### Q: 端口被占用怎么办？

A: 修改环境变量或配置文件中的端口号：

```bash
export PORT=3001
```

或在配置文件中：

```json
{
  "server": {
    "port": 3001
  }
}
```

### Q: 如何添加数据库支持？

A: 查看 `examples/database-integration.js`（即将添加）了解数据库集成示例。

### Q: 如何添加身份验证？

A: 查看 `examples/authentication.js`（即将添加）了解身份验证示例。

## 下一步

- 阅读 [详细文档](DOCS.md)
- 查看更多 [示例代码](examples/)
- 了解 [贡献指南](CONTRIBUTING.md)
- 加入社区讨论

## 需要帮助？

- 查看 [FAQ](README.md#常见问题)
- 创建 [Issue](https://github.com/peacezha/hidog/issues)
- 联系维护者

祝您使用 HiDog 开发愉快！🐕