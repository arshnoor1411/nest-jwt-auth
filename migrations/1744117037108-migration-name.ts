import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MigrationName1744117037108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'posts',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                },
                {
                  name: 'post_content',
                  type: 'varchar',
                  isNullable: false
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                    isNullable: false
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  isNullable: false,
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  isNullable: true,
                },
                {
                  name: 'deleted_at',
                  type: 'timestamp',
                  isNullable: true,
                },
              ],
            }),
            true,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
