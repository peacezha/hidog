# 贡献指南

感谢您对 HiDog 项目的关注！我们欢迎各种形式的贡献，包括但不限于：

- 🐛 Bug 报告
- 💡 功能建议
- 📝 文档改进
- 🔧 代码贡献
- 🧪 测试用例
- 🌐 国际化支持

## 开始之前

### 环境准备

请确保您的开发环境包含：

- Git
- Node.js 14+ 或 Python 3.7+（根据项目技术栈）
- 代码编辑器（推荐 VS Code）

### 克隆项目

```bash
git clone https://github.com/peacezha/hidog.git
cd hidog
```

## 开发流程

### 1. 创建 Issue

在开始编码之前，请先创建一个 Issue 来描述：

- 要修复的问题
- 要添加的功能
- 要改进的文档

### 2. Fork 和分支

1. Fork 本仓库到您的 GitHub 账户
2. 克隆您的 fork：
   ```bash
   git clone https://github.com/YOUR_USERNAME/hidog.git
   ```
3. 创建功能分支：
   ```bash
   git checkout -b feature/your-feature-name
   # 或者修复分支
   git checkout -b fix/bug-description
   ```

### 3. 编码规范

#### 代码风格

- **JavaScript/TypeScript**: 使用 Prettier 和 ESLint
- **Python**: 遵循 PEP 8
- **提交信息**: 使用约定式提交规范

#### 提交信息格式

```
type(scope): description

body

footer
```

类型包括：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或工具变动

示例：
```bash
git commit -m "feat(api): add user authentication endpoint"
git commit -m "fix(ui): resolve layout issue on mobile devices"
git commit -m "docs(readme): update installation instructions"
```

### 4. 测试

在提交之前，请确保：

- [ ] 所有现有测试通过
- [ ] 新功能包含相应测试
- [ ] 代码覆盖率不降低
- [ ] 手动测试验证功能正常

运行测试：
```bash
# Node.js 项目
npm test
npm run test:coverage

# Python 项目
pytest
pytest --cov
```

### 5. 文档更新

如果您的更改需要更新文档，请同时更新：

- README.md
- API 文档
- 代码注释
- 示例代码

## Pull Request 流程

### 创建 PR

1. 将您的更改推送到您的 fork：
   ```bash
   git push origin feature/your-feature-name
   ```

2. 在 GitHub 上创建 Pull Request

3. 填写 PR 模板，包括：
   - 更改描述
   - 相关 Issue
   - 测试说明
   - 截图（如适用）

### PR 要求

- [ ] 代码遵循项目编码规范
- [ ] 包含适当的测试
- [ ] 文档已更新
- [ ] 提交历史整洁
- [ ] PR 描述清晰完整

### 代码审查

维护者将审查您的 PR：

- 我们可能会请求修改
- 请及时响应反馈
- 保持友好的沟通态度

## 报告问题

### Bug 报告

创建 Bug 报告时，请包含：

- **环境信息**: 操作系统、版本号等
- **复现步骤**: 详细的步骤说明
- **期望行为**: 应该发生什么
- **实际行为**: 实际发生了什么
- **截图**: 如果适用
- **相关日志**: 错误信息或日志

使用以下模板：

```markdown
## Bug 描述
简要描述 bug

## 复现步骤
1. 执行 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

## 期望行为
清晰描述您期望发生什么

## 截图
如果适用，添加截图来帮助解释问题

## 环境信息
- OS: [例如 iOS]
- 浏览器 [例如 chrome, safari]
- 版本 [例如 22]
```

### 功能请求

创建功能请求时，请包含：

- **功能描述**: 清晰描述所需功能
- **使用场景**: 为什么需要这个功能
- **建议实现**: 如果有想法
- **替代方案**: 考虑过的其他方案

## 社区准则

### 行为准则

- 保持尊重和友好
- 欢迎不同的观点和经验
- 建设性地给予和接受批评
- 专注于对社区最有利的事情

### 沟通渠道

- **GitHub Issues**: Bug 报告和功能请求
- **GitHub Discussions**: 一般讨论和问题
- **Pull Requests**: 代码审查和讨论

## 认可贡献者

我们感谢所有贡献者的努力！贡献者将被添加到：

- README.md 中的贡献者列表
- 版本发布说明
- 项目网站（如果有）

## 问题和帮助

如果您有任何问题：

1. 查看现有的 Issues 和文档
2. 在 GitHub Discussions 中提问
3. 创建新的 Issue

感谢您的贡献！🎉