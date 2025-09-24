// HiDog API 示例
// 演示如何创建 RESTful API 端点

const hidog = require('../src/index');

// 创建应用实例
const app = hidog.create({
  name: 'HiDog API Demo',
  version: '1.0.0'
});

// 模拟数据存储
const dogs = [
  { id: 1, name: '小黄', breed: '金毛', age: 3 },
  { id: 2, name: '旺财', breed: '柴犬', age: 2 },
  { id: 3, name: '大黑', breed: '拉布拉多', age: 5 }
];

// GET /api/dogs - 获取所有狗狗信息
app.get('/api/dogs', (req, res) => {
  res.json({
    success: true,
    data: dogs,
    total: dogs.length
  });
});

// GET /api/dogs/:id - 获取特定狗狗信息
app.get('/api/dogs/:id', (req, res) => {
  const dogId = parseInt(req.params.id);
  const dog = dogs.find(d => d.id === dogId);
  
  if (!dog) {
    return res.status(404).json({
      success: false,
      message: '狗狗未找到'
    });
  }
  
  res.json({
    success: true,
    data: dog
  });
});

// POST /api/dogs - 添加新的狗狗
app.post('/api/dogs', (req, res) => {
  const { name, breed, age } = req.body;
  
  // 简单验证
  if (!name || !breed || !age) {
    return res.status(400).json({
      success: false,
      message: '姓名、品种和年龄都是必填的'
    });
  }
  
  const newDog = {
    id: Math.max(...dogs.map(d => d.id)) + 1,
    name,
    breed,
    age: parseInt(age)
  };
  
  dogs.push(newDog);
  
  res.status(201).json({
    success: true,
    message: '狗狗添加成功',
    data: newDog
  });
});

// PUT /api/dogs/:id - 更新狗狗信息
app.put('/api/dogs/:id', (req, res) => {
  const dogId = parseInt(req.params.id);
  const dogIndex = dogs.findIndex(d => d.id === dogId);
  
  if (dogIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '狗狗未找到'
    });
  }
  
  const { name, breed, age } = req.body;
  
  // 更新狗狗信息
  if (name) dogs[dogIndex].name = name;
  if (breed) dogs[dogIndex].breed = breed;
  if (age) dogs[dogIndex].age = parseInt(age);
  
  res.json({
    success: true,
    message: '狗狗信息更新成功',
    data: dogs[dogIndex]
  });
});

// DELETE /api/dogs/:id - 删除狗狗
app.delete('/api/dogs/:id', (req, res) => {
  const dogId = parseInt(req.params.id);
  const dogIndex = dogs.findIndex(d => d.id === dogId);
  
  if (dogIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '狗狗未找到'
    });
  }
  
  dogs.splice(dogIndex, 1);
  
  res.json({
    success: true,
    message: '狗狗删除成功'
  });
});

// 启动服务器
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🐕 HiDog API 演示服务运行在 http://localhost:${port}`);
  console.log('\n可用的 API 端点:');
  console.log('  GET    /api/dogs      - 获取所有狗狗');
  console.log('  GET    /api/dogs/:id  - 获取特定狗狗');
  console.log('  POST   /api/dogs      - 添加新狗狗');
  console.log('  PUT    /api/dogs/:id  - 更新狗狗信息');
  console.log('  DELETE /api/dogs/:id  - 删除狗狗');
  console.log('\n测试示例:');
  console.log(`  curl http://localhost:${port}/api/dogs`);
  console.log(`  curl -X POST -H "Content-Type: application/json" -d '{"name":"小白","breed":"比熊","age":1}' http://localhost:${port}/api/dogs`);
});

module.exports = app;