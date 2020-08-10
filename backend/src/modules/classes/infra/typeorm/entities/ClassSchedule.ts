import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Class from "./Class";

@Entity("class_schedule")
export default class ClassSchedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  week_day: number;

  @Column("integer")
  from: number;

  @Column("integer")
  to: number;

  @Column("varchar")
  class_id: string;

  @ManyToOne(() => Class, (myclass) => myclass.classes_schedules)
  @JoinColumn({ name: "class_id", referencedColumnName: "id" })
  class: Class;
}
