import { ConnectionOptions } from 'typeorm';

import config from 'config';

const options: ConnectionOptions = {
  type: 'mysql',
  host: config.get('mysql.host'),
  username: config.get('mysql.username'),
  password: config.get('mysql.password'),
  database: config.get('mysql.database'),
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: ['src/db/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/db/migrations',
    subscribersDir: 'src/db/subscribers',
  },
};

export = options;
