// backend/scripts/init-db.js
const mongoose = require('mongoose');
require('dotenv').config();

const initializeDatabase = async () => {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 创建索引
    await Promise.all([
      mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true }),
      mongoose.connection.collection('entries').createIndex({ userId: 1, date: -1 }),
      mongoose.connection.collection('goals').createIndex({ userId: 1 })
    ]);

    // 插入默认分类
    const categories = [
      { name: '餐饮', type: 'expense', icon: '🍽️' },
      { name: '交通', type: 'expense', icon: '🚗' },
      { name: '购物', type: 'expense', icon: '🛍️' },
      { name: '工资', type: 'income', icon: '💰' },
      { name: '投资', type: 'income', icon: '📈' }
    ];

    await mongoose.connection.collection('categories').insertMany(categories);
    console.log('Database initialized successfully');

    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase();