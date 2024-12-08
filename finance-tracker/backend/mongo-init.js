db.createUser({
    user: "financeapp",
    pwd: "your_password",
    roles: [
      {
        role: "readWrite",
        db: "finance_tracker"
      }
    ]
  });
  
  // 创建索引
  db.users.createIndex({ "email": 1 }, { unique: true });
  db.entries.createIndex({ "userId": 1, "date": -1 });
  db.entries.createIndex({ "userId": 1, "type": 1 });
  db.goals.createIndex({ "userId": 1 });