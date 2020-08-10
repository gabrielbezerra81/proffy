import IConnectionsRepository from "@modules/connections/repositories/IConnectionsRepository";
import { Repository, getRepository } from "typeorm";
import Connection from "../entities/Connection";

export default class ConnectionsRepository implements IConnectionsRepository {
  private ormRepository: Repository<Connection>;

  constructor() {
    this.ormRepository = getRepository(Connection);
  }

  public async create(user_id: string): Promise<Connection> {
    const connection = this.ormRepository.create({ user_id });

    await this.ormRepository.save(connection);

    return connection;
  }

  public async getTotalOfConnections(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }
}
