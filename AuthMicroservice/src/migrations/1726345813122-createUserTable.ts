import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1726345813122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'user',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'username',
                type: 'varchar',
                isUnique: true,
              },
              {
                name: 'hashedPassword',
                type: 'varchar',
              },
              {
                name: 'email',
                type: 'varchar',
                isUnique: true,
              },
              {
                name: 'role',
                type: 'varchar',
                default: `'USER'`,
              },
              {
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'createdAt',
                type: 'timestamptz',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updatedAt',
                type: 'timestamptz',
                default: 'CURRENT_TIMESTAMP',
              },
            ],
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
      }

}
