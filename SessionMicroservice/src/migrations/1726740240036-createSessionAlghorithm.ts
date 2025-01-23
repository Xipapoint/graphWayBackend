import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSessionAlghorithm1726740240036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'alghorithms',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'imagePath',
                    type: 'varchar',
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
        }))
        await queryRunner.query(`
            INSERT INTO sessionStructures (name, description, imagePath)
            VALUES
            ('Dijkstra(undirected)', '', ''),
            ('Floyd-Warshall(undirected)', '', '');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('alghorithms')
    }

}
