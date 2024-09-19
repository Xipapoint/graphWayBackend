import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateVertex1726740255217 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'vertices',
            columns:[
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'index',
                    type: 'int',
                },
                {
                    name: 'xCord',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'yCord',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'pair',
                    type: 'int',
                    isNullable: true,
                    isArray: true,
                },
                {
                    name: 'sessionId',
                    type: 'uuid',
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
                }
            ]
        }))

        await queryRunner.createForeignKey('vertices', new TableForeignKey({
            columnNames: ['sessionId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sessions',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vertices')
    }

}
