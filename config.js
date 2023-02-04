// migrations/config/config.js
import config from './db/config/config.js';

const env = process.env.NODE_ENV || 'development';

export default {
  [env]: {
        url: config.mysql.migrate,
        dialect: 'mysql',
        migrationStorageTableName: 'SequelizeMeta'
      }
};