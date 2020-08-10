import { container } from "tsyringe";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IClassesRepository from "@modules/classes/repositories/IClassesRepository";
import ClassesRepository from "@modules/classes/infra/typeorm/repositories/ClassesRepository";
import IClassesSchedulesRepository from "@modules/classes/repositories/IClassesSchedulesRepository";
import ClassesSchedulesRepository from "@modules/classes/infra/typeorm/repositories/ClassesSchedulesRepository";
import IConnectionsRepository from "@modules/connections/repositories/IConnectionsRepository";
import ConnectionsRepository from "@modules/connections/infra/typeorm/repositories/ConnectionsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IClassesRepository>(
  "ClassesRepository",
  ClassesRepository
);

container.registerSingleton<IClassesSchedulesRepository>(
  "ClassesSchedulesRepository",
  ClassesSchedulesRepository
);

container.registerSingleton<IConnectionsRepository>(
  "ConnectionsRepository",
  ConnectionsRepository
);
