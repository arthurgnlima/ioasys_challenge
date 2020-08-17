import { createConnection } from 'typeorm';

createConnection({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities:
    process.env.NODE_ENV !== 'local'
      ? ['./dist/infra/typeorm/entities/*.js']
      : ['./src/infra/typeorm/entities/*.ts'],
});
