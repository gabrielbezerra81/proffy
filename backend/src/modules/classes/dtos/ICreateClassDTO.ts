import User from "@modules/users/infra/typeorm/entities/User";

export default interface ICreateClassDTO {
  user: User;
  subject: string;
  cost: number;
}
