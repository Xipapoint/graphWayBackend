import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEdge1726740261802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'edges',
            columns:[
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'index',
                    type: 'int'
                },
                {
                    name: 'left',
                    type: 'id'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
