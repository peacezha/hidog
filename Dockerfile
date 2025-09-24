# HiDog Docker Image
# 多阶段构建，优化镜像大小

# 构建阶段
FROM node:16-alpine AS builder

WORKDIR /app

# 复制包管理文件
COPY package*.json ./

# 安装所有依赖（包括开发依赖）
RUN npm ci

# 复制源代码
COPY . .

# 构建项目（如果有构建步骤）
RUN npm run build 2>/dev/null || echo "No build script found, skipping..."

# 生产阶段
FROM node:16-alpine AS production

# 设置工作目录
WORKDIR /app

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S hidog -u 1001

# 复制包管理文件
COPY package*.json ./

# 安装生产依赖
RUN npm ci --only=production && \
    npm cache clean --force

# 复制构建产物和必要文件
COPY --from=builder --chown=hidog:nodejs /app/dist ./dist 2>/dev/null || true
COPY --from=builder --chown=hidog:nodejs /app/src ./src
COPY --from=builder --chown=hidog:nodejs /app/config ./config

# 创建日志目录
RUN mkdir -p /app/logs && \
    chown -R hidog:nodejs /app

# 切换到非 root 用户
USER hidog

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); \
        const options = { hostname: 'localhost', port: 3000, path: '/health', method: 'GET' }; \
        const req = http.request(options, (res) => { \
            if (res.statusCode === 200) process.exit(0); \
            else process.exit(1); \
        }); \
        req.on('error', () => process.exit(1)); \
        req.end();"

# 启动命令
CMD ["npm", "start"]