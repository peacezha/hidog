// HiDog 主入口文件
// 这是 HiDog 项目的核心模块

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

/**
 * HiDog 类 - 主要的应用框架类
 */
class HiDog {
  constructor(options = {}) {
    this.app = express();
    this.name = options.name || 'HiDog App';
    this.version = options.version || '1.0.0';
    this.config = this.loadConfig(options.config);
    
    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * 加载配置文件
   * @param {string} configPath - 配置文件路径
   * @returns {object} 配置对象
   */
  loadConfig(configPath) {
    const env = process.env.NODE_ENV || 'development';
    const defaultConfigPath = path.join(__dirname, '../config', `${env}.json`);
    const targetConfigPath = configPath || defaultConfigPath;
    
    try {
      if (fs.existsSync(targetConfigPath)) {
        return JSON.parse(fs.readFileSync(targetConfigPath, 'utf8'));
      }
    } catch (error) {
      console.warn(`⚠️  配置文件加载失败: ${error.message}`);
    }
    
    // 返回默认配置
    return {
      server: { port: 3000, host: 'localhost' },
      logging: { level: 'info', console: true }
    };
  }

  /**
   * 设置中间件
   */
  setupMiddleware() {
    // 安全中间件
    this.app.use(helmet());
    
    // CORS 支持
    this.app.use(cors(this.config.server?.cors || {}));
    
    // 请求日志
    if (this.config.logging?.console) {
      this.app.use(morgan('combined'));
    }
    
    // JSON 解析
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * 设置基础路由
   */
  setupRoutes() {
    // 根路径
    this.app.get('/', (req, res) => {
      res.json({
        name: this.name,
        version: this.version,
        message: 'Welcome to HiDog! 🐕',
        timestamp: new Date().toISOString()
      });
    });

    // 健康检查
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: this.version
      });
    });

    // 配置信息（开发环境）
    if (process.env.NODE_ENV === 'development') {
      this.app.get('/config', (req, res) => {
        res.json({
          config: this.config,
          environment: process.env.NODE_ENV
        });
      });
    }
  }

  /**
   * 添加路由
   * @param {string} method - HTTP 方法
   * @param {string} path - 路径
   * @param {function} handler - 处理函数
   */
  addRoute(method, path, handler) {
    this.app[method.toLowerCase()](path, handler);
    return this;
  }

  /**
   * GET 路由快捷方法
   */
  get(path, handler) {
    return this.addRoute('GET', path, handler);
  }

  /**
   * POST 路由快捷方法
   */
  post(path, handler) {
    return this.addRoute('POST', path, handler);
  }

  /**
   * PUT 路由快捷方法
   */
  put(path, handler) {
    return this.addRoute('PUT', path, handler);
  }

  /**
   * DELETE 路由快捷方法
   */
  delete(path, handler) {
    return this.addRoute('DELETE', path, handler);
  }

  /**
   * 启动服务器
   * @param {number} port - 端口号
   * @param {function} callback - 启动后的回调函数
   */
  listen(port, callback) {
    const serverPort = port || this.config.server?.port || 3000;
    const serverHost = this.config.server?.host || 'localhost';
    
    this.server = this.app.listen(serverPort, serverHost, callback);
    return this.server;
  }

  /**
   * 关闭服务器
   */
  close() {
    if (this.server) {
      this.server.close();
    }
  }
}

/**
 * 工厂函数 - 创建 HiDog 实例
 * @param {object} options - 配置选项
 * @returns {HiDog} HiDog 实例
 */
function create(options = {}) {
  return new HiDog(options);
}

module.exports = {
  HiDog,
  create
};