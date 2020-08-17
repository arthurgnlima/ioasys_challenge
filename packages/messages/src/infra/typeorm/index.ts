import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: Number(process.env.MONGO_PORT),
    database: process.env.MONGO_NAME,
    useUnifiedTopology: true,
    entities:
      process.env.NODE_ENV !== 'local'
        ? ['./dist/infra/typeorm/schemas/*.js']
        : ['./src/infra/typeorm/schemas/*.ts'],
  },
]);
