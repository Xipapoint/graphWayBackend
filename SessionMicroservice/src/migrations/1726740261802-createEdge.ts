import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEdge1726740261802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'edges',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'left',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'top',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'angle',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'startVertex',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'endVertex',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'sessionId',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamptz',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'updatedAt',
                    type: 'timestamptz',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                }
            ]
        }),
        true
    )}

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
