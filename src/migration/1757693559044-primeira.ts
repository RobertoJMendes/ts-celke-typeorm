import { Table, type MigrationInterface, type QueryRunner } from "typeorm";

export class Primeira1757693559044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"user",
            columns: [
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:"increment",
                },
                {
                    name:"name",
                    type:"varchar",
                },
                {
                    name:"email",
                    type:"varchar",
                    isUnique:true,
                },
                {
                    name:"createdAt",
                    type:"timestamp",
                    default:"CURRENT_TIMESTAMP",
                },
                {
                    name:"updatedAt",
                    type:"timestamp",
                    default:"CURRENT_TIMESTAMP",
                    onUpdate:"CURRENT_TIMESTAMP"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
