import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1710659900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        status ENUM('new', 'active', 'stopped') NOT NULL DEFAULT 'new',
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(1024),
        status ENUM('new', 'active', 'stopped') NOT NULL DEFAULT 'new',
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users_projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        project_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_project (user_id, project_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS sources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(512) NOT NULL,
        \`key\` VARCHAR(50) NOT NULL,
        status ENUM('new', 'active', 'stopped') NOT NULL DEFAULT 'new',
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS projects_sources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        source_id INT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE,
        UNIQUE KEY unique_project_source (project_id, source_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS consumers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        \`key\` VARCHAR(50) NOT NULL,
        status ENUM('new', 'active', 'stopped') NOT NULL DEFAULT 'new',
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS projects_consumers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        consumer_id INT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (consumer_id) REFERENCES consumers(id) ON DELETE CASCADE,
        UNIQUE KEY unique_project_consumer (project_id, consumer_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(1024) NOT NULL,
        project_id INT NOT NULL,
        source_id INT NOT NULL,
        image VARCHAR(512),
        status ENUM('new', 'published') NOT NULL DEFAULT 'new',
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_sources_status ON sources(status);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_consumers_status ON consumers(status);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_articles_project_id ON articles(project_id);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_articles_source_id ON articles(source_id);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS articles;`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects_consumers;`);
    await queryRunner.query(`DROP TABLE IF EXISTS consumers;`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects_sources;`);
    await queryRunner.query(`DROP TABLE IF EXISTS sources;`);
    await queryRunner.query(`DROP TABLE IF EXISTS users_projects;`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects;`);
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
