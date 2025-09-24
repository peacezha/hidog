// HiDog 基础测试
// 使用 Jest 测试框架

const { HiDog, create } = require('../index');
const request = require('supertest');

describe('HiDog Framework', () => {
  let app;
  let server;

  beforeEach(() => {
    app = create({
      name: 'Test App',
      version: '1.0.0-test'
    });
  });

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  describe('HiDog 实例创建', () => {
    test('应该能创建 HiDog 实例', () => {
      expect(app).toBeInstanceOf(HiDog);
    });

    test('应该有正确的默认配置', () => {
      expect(app.name).toBe('Test App');
      expect(app.version).toBe('1.0.0-test');
      expect(app.config).toBeDefined();
    });

    test('应该能使用工厂函数创建实例', () => {
      const factoryApp = create();
      expect(factoryApp).toBeInstanceOf(HiDog);
    });
  });

  describe('基础路由', () => {
    test('GET / 应该返回应用信息', async () => {
      const response = await request(app.app)
        .get('/')
        .expect(200);

      expect(response.body).toEqual({
        name: 'Test App',
        version: '1.0.0-test',
        message: 'Welcome to HiDog! 🐕',
        timestamp: expect.any(String)
      });
    });

    test('GET /health 应该返回健康状态', async () => {
      const response = await request(app.app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'healthy',
        uptime: expect.any(Number),
        memory: expect.any(Object),
        version: '1.0.0-test'
      });
    });
  });

  describe('自定义路由', () => {
    test('应该能添加 GET 路由', async () => {
      app.get('/test', (req, res) => {
        res.json({ message: 'test route' });
      });

      const response = await request(app.app)
        .get('/test')
        .expect(200);

      expect(response.body).toEqual({
        message: 'test route'
      });
    });

    test('应该能添加 POST 路由', async () => {
      app.post('/test', (req, res) => {
        res.json({ received: req.body });
      });

      const testData = { name: '测试数据' };
      const response = await request(app.app)
        .post('/test')
        .send(testData)
        .expect(200);

      expect(response.body).toEqual({
        received: testData
      });
    });

    test('应该能添加带参数的路由', async () => {
      app.get('/user/:id', (req, res) => {
        res.json({ userId: req.params.id });
      });

      const response = await request(app.app)
        .get('/user/123')
        .expect(200);

      expect(response.body).toEqual({
        userId: '123'
      });
    });
  });

  describe('服务器启动和关闭', () => {
    test('应该能启动服务器', (done) => {
      server = app.listen(0, () => {
        expect(server).toBeDefined();
        expect(server.listening).toBe(true);
        done();
      });
    });

    test('应该能关闭服务器', () => {
      server = app.listen(0, () => {
        app.close();
        expect(server.listening).toBe(false);
      });
    });
  });

  describe('配置加载', () => {
    test('应该能加载默认配置', () => {
      const config = app.config;
      expect(config).toBeDefined();
      expect(config.server).toBeDefined();
    });

    test('应该处理配置文件不存在的情况', () => {
      const appWithBadConfig = create({
        config: '/nonexistent/config.json'
      });
      expect(appWithBadConfig.config).toBeDefined();
      expect(appWithBadConfig.config.server).toBeDefined();
    });
  });
});

// 集成测试
describe('HiDog 集成测试', () => {
  test('应该能处理完整的请求流程', async () => {
    const app = create({
      name: 'Integration Test App'
    });

    // 添加一些路由
    app.get('/api/users', (req, res) => {
      res.json({
        users: [
          { id: 1, name: '张三' },
          { id: 2, name: '李四' }
        ]
      });
    });

    app.post('/api/users', (req, res) => {
      res.status(201).json({
        success: true,
        user: req.body
      });
    });

    // 测试 GET 请求
    await request(app.app)
      .get('/api/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users).toHaveLength(2);
      });

    // 测试 POST 请求
    await request(app.app)
      .post('/api/users')
      .send({ name: '王五', age: 25 })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.user.name).toBe('王五');
      });
  });
});