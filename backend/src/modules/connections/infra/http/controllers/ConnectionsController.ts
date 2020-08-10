import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateConnectionService from "@modules/connections/services/CreateConnectionService";
import ConnectionsRepository from "../../typeorm/repositories/ConnectionsRepository";

export default class ConnectionsController {
  public async index(request: Request, response: Response) {
    const connectionsRepository = new ConnectionsRepository();

    const totalOfConnections = await connectionsRepository.getTotalOfConnections();

    return response.json({ total: totalOfConnections });
  }

  public async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const createConnectionService = container.resolve(CreateConnectionService);

    const connection = await createConnectionService.execute(user_id);

    return response.json(connection);
  }
}
