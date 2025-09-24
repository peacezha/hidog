# 项目结构

这里介绍 HiDog 项目的文件结构和组织方式，帮助开发者快速理解和参与开发。

## 根目录结构

```
hidog/
├── README.md              # 项目说明文档
├── CONTRIBUTING.md        # 贡献指南
├── LICENSE                # 许可证文件
├── DOCS.md               # 详细文档（本文件）
├── .gitignore            # Git 忽略规则
├── package.json          # Node.js 依赖配置（如果适用）
├── requirements.txt      # Python 依赖配置（如果适用）
├── config/               # 配置文件目录
│   ├── default.json      # 默认配置
│   ├── development.json  # 开发环境配置
│   └── production.json   # 生产环境配置
├── src/                  # 源代码目录
│   ├── main/             # 主要逻辑
│   ├── utils/            # 工具函数
│   └── tests/            # 测试文件
├── docs/                 # 详细文档
│   ├── api/              # API 文档
│   ├── guides/           # 使用指南
│   └── examples/         # 示例代码
├── scripts/              # 构建和部署脚本
└── dist/                 # 构建输出目录
```

## 核心文件说明

### 配置文件

- **package.json** / **requirements.txt**: 项目依赖管理
- **config/***: 环境相关的配置文件
- **.gitignore**: 版本控制忽略规则

### 源代码

- **src/main/**: 核心业务逻辑
- **src/utils/**: 通用工具和助手函数
- **src/tests/**: 单元测试和集成测试

### 文档

- **docs/**: 详细的项目文档
- **README.md**: 项目入门文档
- **CONTRIBUTING.md**: 开发贡献指南

## 开发工作流

### 1. 本地开发

```bash
# 安装依赖
npm install  # 或 pip install -r requirements.txt

# 启动开发服务器
npm run dev  # 或 python -m hidog

# 运行测试
npm test     # 或 pytest
```

### 2. 构建和部署

```bash
# 构建项目
npm run build  # 或 python setup.py build

# 运行生产版本
npm start      # 或 python -m hidog --prod
```

### 3. 代码质量

```bash
# 代码格式化
npm run format  # 或 black src/

# 代码检查
npm run lint    # 或 flake8 src/

# 类型检查（如果适用）
npm run typecheck  # 或 mypy src/
```

## 配置说明

### 环境变量

项目支持以下环境变量：

| 变量名 | 描述 | 默认值 | 示例 |
|--------|------|--------|------|
| `HIDOG_ENV` | 运行环境 | `development` | `production` |
| `HIDOG_PORT` | 服务端口 | `3000` | `8080` |
| `HIDOG_LOG_LEVEL` | 日志级别 | `info` | `debug` |

### 配置文件

项目使用 JSON 格式的配置文件，支持环境特定的配置：

```json
{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "hidog"
  },
  "logging": {
    "level": "info",
    "file": "hidog.log"
  }
}
```

## 开发工具

### 推荐的开发工具

- **编辑器**: Visual Studio Code
- **版本控制**: Git
- **包管理**: npm/yarn (Node.js) 或 pip (Python)
- **调试器**: 浏览器开发者工具或 IDE 集成调试器

### VS Code 配置

推荐安装以下扩展：

- ESLint (JavaScript/TypeScript)
- Prettier (代码格式化)
- Python (Python 开发)
- GitLens (Git 增强)

## API 设计原则

### RESTful API

- 使用标准 HTTP 方法
- 清晰的 URL 结构
- 适当的状态码
- JSON 数据格式

### 错误处理

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "输入数据验证失败",
    "details": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      }
    ]
  }
}
```

## 测试策略

### 测试类型

1. **单元测试**: 测试单个函数或类
2. **集成测试**: 测试组件间的交互
3. **端到端测试**: 测试完整的用户流程

### 测试覆盖率

- 目标覆盖率: >= 80%
- 关键路径: 100% 覆盖
- 错误处理: 完全覆盖

## 性能优化

### 代码优化

- 避免不必要的计算
- 使用适当的数据结构
- 实现缓存策略
- 异步处理长时间操作

### 资源优化

- 压缩静态资源
- 使用 CDN
- 实现请求节流
- 数据库查询优化

## 安全考虑

### 输入验证

- 验证所有用户输入
- 防止 SQL 注入
- 防止 XSS 攻击
- CSRF 保护

### 数据保护

- 敏感数据加密
- 安全的密码存储
- HTTPS 传输
- 访问控制

## 部署指南

### 开发环境

```bash
# 使用本地配置
export HIDOG_ENV=development
npm run dev
```

### 生产环境

```bash
# 使用生产配置
export HIDOG_ENV=production
npm run build
npm start
```

### Docker 部署

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 故障排除

### 常见问题

1. **依赖安装失败**: 检查 Node.js/Python 版本
2. **端口占用**: 更改配置或停止占用进程
3. **权限错误**: 检查文件权限设置

### 调试技巧

- 使用详细日志级别
- 检查配置文件
- 验证环境变量
- 查看系统资源使用情况

## 社区和支持

### 获取帮助

- 查看项目文档
- 搜索已有 Issues
- 创建新的 Issue
- 参与社区讨论

### 贡献代码

请参考 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目开发。

---

本文档会随着项目的发展持续更新，如有疑问请创建 Issue。