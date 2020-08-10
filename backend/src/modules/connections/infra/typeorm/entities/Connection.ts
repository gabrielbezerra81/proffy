import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

@Entity("connections")
export default class Connection {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  user_id: string;
  //   @OneToMany(() => User, (user) => user)
  //   user: User;

  @CreateDateColumn()
  created_at: Date;
}
