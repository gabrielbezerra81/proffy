import { Repository, getRepository } from "typeorm";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "../entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    avatar,
    whatsapp,
    bio,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, avatar, whatsapp, bio });

    await this.ormRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }
}
