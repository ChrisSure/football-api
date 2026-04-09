import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1744399200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users 
      ADD COLUMN role ENUM('admin', 'moderator') NOT NULL DEFAULT 'moderator';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users DROP COLUMN role;
    `);
  }
}
