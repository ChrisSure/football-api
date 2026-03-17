import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'xfootball',
  entities: ['src/db/entities/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  charset: 'utf8mb4',
});
