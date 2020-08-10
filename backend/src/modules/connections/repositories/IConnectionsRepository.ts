import Connection from "../infra/typeorm/entities/Connection";

export default interface IConnectionsRepository {
  create(user_id: string): Promise<Connection>;
  getTotalOfConnections(): Promise<number>;
}
