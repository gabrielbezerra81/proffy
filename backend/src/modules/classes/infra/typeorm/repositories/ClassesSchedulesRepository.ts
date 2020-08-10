import IClassesSchedulesRepository from "@modules/classes/repositories/IClassesSchedulesRepository";
import { Repository, getRepository } from "typeorm";
import ClassSchedule from "../entities/ClassSchedule";
import ICreateClassScheduleDTO from "@modules/classes/dtos/ICreateClassScheduleDTO";

export default class ClassesSchedulesRepository
  implements IClassesSchedulesRepository {
  private ormRepository: Repository<ClassSchedule>;

  constructor() {
    this.ormRepository = getRepository(ClassSchedule);
  }

  public async create({ schedule }: ICreateClassScheduleDTO) {
    const classSchedules = schedule.map((scheduleItem) =>
      this.ormRepository.create(scheduleItem)
    );

    return classSchedules;
  }
}
