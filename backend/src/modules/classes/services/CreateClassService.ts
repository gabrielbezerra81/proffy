import { injectable, inject } from "tsyringe";
import { getConnection } from "typeorm";
import IClassesRepository from "../repositories/IClassesRepository";
import Class from "../infra/typeorm/entities/Class";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import IClassesSchedulesRepository from "../repositories/IClassesSchedulesRepository";
import convertHourToMinutes from "utils/convertHourToMinutes";

interface Request {
  user_id: string;
  subject: string;
  cost: number;
  schedule: Array<{
    week_day: number;
    from: string;
    to: string;
  }>;
}

@injectable()
export default class CreateClassService {
  constructor(
    @inject("ClassesRepository") private classesRepository: IClassesRepository,
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("ClassesSchedulesRepository")
    private classesSchedulesRepository: IClassesSchedulesRepository
  ) {}

  public async execute({
    cost,
    subject,
    user_id,
    schedule,
  }: Request): Promise<Class> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist.");
    }

    let createdClass = await this.classesRepository.create({
      cost,
      subject,
      user,
    });

    createdClass = await getConnection().transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(createdClass);

        const classSchedule = schedule.map((scheduleItem) => ({
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id: createdClass.id,
        }));

        const createdSchedules = await this.classesSchedulesRepository.create({
          schedule: classSchedule,
        });

        await Promise.all(
          createdSchedules.map((createdSchedule) =>
            transactionalEntityManager.save(createdSchedule)
          )
        );

        createdClass.classes_schedules = createdSchedules;

        return createdClass;
      }
    );

    return createdClass;
  }
}
