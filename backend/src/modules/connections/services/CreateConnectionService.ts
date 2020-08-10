import { injectable, inject } from "tsyringe";
import Connection from "../infra/typeorm/entities/Connection";
import IConnectionsRepository from "../repositories/IConnectionsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateConnectionService {
  constructor(
    @inject("ConnectionsRepository") private connectionsRepository: IConnectionsRepository,
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string): Promise<Connection> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist.");
    }

    const connection = await this.connectionsRepository.create(user_id);

    return connection;
  }
}
