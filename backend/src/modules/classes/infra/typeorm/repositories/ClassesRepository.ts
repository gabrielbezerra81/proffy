import { Repository, getRepository } from "typeorm";
import Class from "../entities/Class";
import IClassesRepository from "@modules/classes/repositories/IClassesRepository";
import ICreateClassDTO from "@modules/classes/dtos/ICreateClassDTO";
import IFindByDaySubjectAndTimeDTO from "@modules/classes/dtos/IFindByDaySubjectAndTimeDTO";

export default class ClassesRepository implements IClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }
  public async create({
    cost,
    subject,
    user,
  }: ICreateClassDTO): Promise<Class> {
    const newClass = this.ormRepository.create({ cost, subject, user });

    return newClass;
  }

  public async findByDaySubjectAndTime({
    week_day,
    subject,
    time,
  }: IFindByDaySubjectAndTimeDTO): Promise<Class[]> {
    const classes = await this.ormRepository
      .createQueryBuilder("class")
      .innerJoinAndSelect("class.classes_schedules", "schedule")
      .where("class.subject = :subject")
      .andWhere("schedule.week_day IN (:...week_day)")
      .andWhere("schedule.from <= :time")
      .andWhere("schedule.to > :time")
      .setParameters({ week_day: [week_day], subject, time })
      .getMany();

    return classes;
  }
}
