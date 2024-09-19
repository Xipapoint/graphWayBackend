import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSessionTable1726651260625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sessions',
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
                    name: 'sessionTypeId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'structTypeId',
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
        await queryRunner.createForeignKey('sessions', new TableForeignKey({
            columnNames: ['sessionTypeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sessionTypes',
            onDelete: 'CASCADE', 
        }));

        await queryRunner.createForeignKey('sessions', new TableForeignKey({
            columnNames: ['sessionStructId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sessionStructures',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('sessions', new TableForeignKey({
            columnNames: ['sessionAlghorithmId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'alghorithms',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sessions');
    }

}
