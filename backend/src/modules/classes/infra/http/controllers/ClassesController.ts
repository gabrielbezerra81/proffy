import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "@modules/users/services/CreateUserService";
import CreateClassService from "@modules/classes/services/CreateClassService";
import ListClassesService from "@modules/classes/services/ListClassesService";

interface ClassesFilterParams {
  week_day: string;
  subject: string;
  time: string;
}

export default class ClassesController {
  public async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const createClassService = container.resolve(CreateClassService);

    const newClass = await createClassService.execute({
      subject,
      cost,
      user_id: user.id,
      schedule,
    });

    return response.json({
      user,
      class: newClass,
    });
  }

  public async index(request: Request, response: Response) {
    const {
      week_day,
      subject,
      time,
    } = (request.query as unknown) as ClassesFilterParams;

    const listClassesService = container.resolve(ListClassesService);

    const classes = await listClassesService.execute({
      week_day: Number(week_day),
      subject,
      time,
    });

    return response.json(classes);
  }
}
