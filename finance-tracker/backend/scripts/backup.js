const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

const backup = () => {
  const date = new Date().toISOString().split('T')[0];
  const backupPath = path.join(__dirname, '../backups', `backup-${date}`);
  
  const cmd = `mongodump --uri="${process.env.MONGODB_URI}" --out="${backupPath}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`备份失败: ${error}`);
      return;
    }
    console.log('数据库备份成功！');
    console.log(`备份位置: ${backupPath}`);
  });
};

backup();