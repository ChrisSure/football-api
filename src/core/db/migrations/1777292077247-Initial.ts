import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1777292077247 implements MigrationInterface {
  name = 'Initial1777292077247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(1024) NOT NULL, \`image\` varchar(512) NULL, \`status\` enum ('new', 'published') NOT NULL DEFAULT 'new', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`project_id\` int NULL, \`source_id\` int NULL, INDEX \`idx_articles_source_id\` (\`source_id\`), INDEX \`idx_articles_project_id\` (\`project_id\`), INDEX \`idx_articles_status\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sources\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url\` varchar(512) NOT NULL, \`key\` varchar(50) NOT NULL, \`status\` enum ('new', 'active', 'stopped') NOT NULL DEFAULT 'new', \`project_id\` int NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_sources_status\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`consumers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`key\` varchar(50) NOT NULL, \`status\` enum ('new', 'active', 'stopped') NOT NULL DEFAULT 'new', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_consumers_status\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(1024) NULL, \`status\` enum ('new', 'active', 'stopped') NOT NULL DEFAULT 'new', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_projects_status\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` enum ('new', 'active', 'stopped') NOT NULL DEFAULT 'new', \`role\` enum ('admin', 'moderator') NOT NULL DEFAULT 'moderator', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_users_status\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects_consumers\` (\`project_id\` int NOT NULL, \`consumer_id\` int NOT NULL, INDEX \`IDX_6c9b8146de149bd7a07437e4f6\` (\`project_id\`), INDEX \`IDX_35790631685f964ecc9807badd\` (\`consumer_id\`), PRIMARY KEY (\`project_id\`, \`consumer_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_projects\` (\`user_id\` int NOT NULL, \`project_id\` int NOT NULL, INDEX \`IDX_0f280c70a3a6ab7f4cf3c658c4\` (\`user_id\`), INDEX \`IDX_741210c246defe00ed877a98f2\` (\`project_id\`), PRIMARY KEY (\`user_id\`, \`project_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` ADD CONSTRAINT \`FK_78358d5f0a2f8563cb9d67ca5ac\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` ADD CONSTRAINT \`FK_1b1f842e6847a8cc132cab08ba7\` FOREIGN KEY (\`source_id\`) REFERENCES \`sources\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sources\` ADD CONSTRAINT \`FK_586cceec6abec4b21369e8f3d6b\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_consumers\` ADD CONSTRAINT \`FK_6c9b8146de149bd7a07437e4f64\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_consumers\` ADD CONSTRAINT \`FK_35790631685f964ecc9807badd3\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_0f280c70a3a6ab7f4cf3c658c4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_741210c246defe00ed877a98f2a\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_741210c246defe00ed877a98f2a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_0f280c70a3a6ab7f4cf3c658c4c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_consumers\` DROP FOREIGN KEY \`FK_35790631685f964ecc9807badd3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_consumers\` DROP FOREIGN KEY \`FK_6c9b8146de149bd7a07437e4f64\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sources\` DROP FOREIGN KEY \`FK_586cceec6abec4b21369e8f3d6b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` DROP FOREIGN KEY \`FK_1b1f842e6847a8cc132cab08ba7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` DROP FOREIGN KEY \`FK_78358d5f0a2f8563cb9d67ca5ac\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_741210c246defe00ed877a98f2\` ON \`users_projects\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0f280c70a3a6ab7f4cf3c658c4\` ON \`users_projects\``,
    );
    await queryRunner.query(`DROP TABLE \`users_projects\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_35790631685f964ecc9807badd\` ON \`projects_consumers\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6c9b8146de149bd7a07437e4f6\` ON \`projects_consumers\``,
    );
    await queryRunner.query(`DROP TABLE \`projects_consumers\``);
    await queryRunner.query(`DROP INDEX \`idx_users_status\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`idx_projects_status\` ON \`projects\``,
    );
    await queryRunner.query(`DROP TABLE \`projects\``);
    await queryRunner.query(
      `DROP INDEX \`idx_consumers_status\` ON \`consumers\``,
    );
    await queryRunner.query(`DROP TABLE \`consumers\``);
    await queryRunner.query(`DROP INDEX \`idx_sources_status\` ON \`sources\``);
    await queryRunner.query(`DROP TABLE \`sources\``);
    await queryRunner.query(
      `DROP INDEX \`idx_articles_status\` ON \`articles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_articles_project_id\` ON \`articles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_articles_source_id\` ON \`articles\``,
    );
    await queryRunner.query(`DROP TABLE \`articles\``);
  }
}
