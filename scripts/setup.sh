#!/bin/bash

# HiDog 开发环境设置脚本
# 此脚本帮助快速设置开发环境

set -e

echo "🐕 开始设置 HiDog 开发环境..."

# 检查 Node.js 版本
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js 已安装: $NODE_VERSION"
else
    echo "❌ Node.js 未安装，请安装 Node.js 14+ 版本"
    exit 1
fi

# 检查 npm 版本
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm 已安装: $NPM_VERSION"
else
    echo "❌ npm 未安装"
    exit 1
fi

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 创建日志目录
echo "📁 创建日志目录..."
mkdir -p logs

# 检查 Python（可选）
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python 已安装: $PYTHON_VERSION"
    
    echo "🐍 安装 Python 依赖..."
    if command -v pip3 &> /dev/null; then
        pip3 install -r requirements.txt
    else
        echo "⚠️  pip3 未找到，跳过 Python 依赖安装"
    fi
else
    echo "⚠️  Python 未安装，跳过 Python 依赖"
fi

# 设置 Git hooks（如果存在）
if [ -d ".git" ]; then
    echo "🔧 设置 Git hooks..."
    npm run prepare 2>/dev/null || echo "⚠️  Git hooks 设置跳过"
fi

echo ""
echo "🎉 HiDog 开发环境设置完成！"
echo ""
echo "📚 接下来可以："
echo "  npm run dev    # 启动开发服务器"
echo "  npm test       # 运行测试"
echo "  npm run build  # 构建项目"
echo ""
echo "📖 查看 README.md 了解更多信息"