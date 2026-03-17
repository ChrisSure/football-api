import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';

config();

async function createDatabase() {
  const connection = await createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  const dbName = process.env.DB_DATABASE || 'xfootball';

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    console.log(`✅ Database '${dbName}' created or already exists`);
  } catch (error) {
    console.error('❌ Error creating database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

createDatabase()
  .then(() => {
    console.log('✅ Database setup complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  });
