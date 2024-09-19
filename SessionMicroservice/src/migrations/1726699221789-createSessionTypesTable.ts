import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSessionTypesTable1726699221789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sessionTypes',
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
        }));

        // Вставка начальных данных
        await queryRunner.query(`
            INSERT INTO sessionTypes (name, description, imagePath)
            VALUES
            ('Graph', '', '/src/images/graphImage.png'),
            ('Tree', '', '/src/images/newTreeImage.png');
        `);
        await queryRunner.createForeignKey('sessions', new TableForeignKey({
            columnNames: ['sessionTypeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sessions',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('sessionTypes')
    }

}
