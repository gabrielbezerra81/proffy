import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateClasses1596911611837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "classes",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "subject",
            type: "varchar",
          },
          {
            name: "cost",
            type: "decimal",
            precision: 6,
            scale: 2,
          },
          {
            name: "user_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "classes",
      new TableForeignKey({
        name: "ClassProffy",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("classes", "ClassProffy");
    await queryRunner.dropTable("classes");
  }
}
