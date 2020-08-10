import { injectable, inject } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    avatar,
    whatsapp,
    bio,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      avatar,
      whatsapp,
      bio,
    });

    return user;
  }
}
