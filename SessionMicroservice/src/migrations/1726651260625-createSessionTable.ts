import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateGraphSessionTable1726651260625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'graph-sessions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'sessionName',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'sessionImagePath',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'sessionAlghorithmId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'shortestVertices',
                    type: 'int',
                    isNullable: true,
                    isArray: true,
                },
                {
                    name: 'userId',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'alghorithmId',
                    type: 'int',
                    isNullable: false,
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
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sessions');
    }

}
