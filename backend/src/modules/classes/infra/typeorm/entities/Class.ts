import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";
import ClassSchedule from "./ClassSchedule";

@Entity("classes")
export default class Class {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  subject: string;

  @Column("decimal")
  cost: number;

  // Inserir relacionamento
  @ManyToOne(() => User, (user) => user.classes, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @OneToMany(() => ClassSchedule, (classSchedule) => classSchedule.class, {
    eager: false,
  })
  classes_schedules: ClassSchedule[];
}
