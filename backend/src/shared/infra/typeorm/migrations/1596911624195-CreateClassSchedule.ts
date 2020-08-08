import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateClassSchedule1596911624195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "class_schedule",
        columns: [
          {
            name: "id",
            type: "uuid",
            isUnique: true,
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "week_day",
            type: "integer",
          },
          {
            name: "from",
            type: "integer",
          },
          {
            name: "to",
            type: "integer",
          },
          {
            name: "class_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "class_schedule",
      new TableForeignKey({
        name: "ClassID",
        referencedTableName: "classes",
        referencedColumnNames: ["id"],
        columnNames: ["class_id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("class_schedule", "ClassID");
    await queryRunner.dropTable("class_schedule");
  }
}
