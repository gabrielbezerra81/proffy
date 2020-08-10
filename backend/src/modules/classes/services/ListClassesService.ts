import { injectable, inject } from "tsyringe";
import IClassesRepository from "../repositories/IClassesRepository";
import AppError from "@shared/errors/AppError";
import convertHourToMinutes from "utils/convertHourToMinutes";

interface Request {
  week_day: number;
  subject: string;
  time: string;
}

@injectable()
export default class ListClassesService {
  constructor(
    @inject("ClassesRepository") private classesRepository: IClassesRepository
  ) {}

  public async execute({ subject, time, week_day }: Request) {
    if (!subject || !time || !week_day) {
      throw new AppError("Filter params missing");
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await this.classesRepository.findByDaySubjectAndTime({
      week_day,
      subject,
      time: timeInMinutes,
    });

    return classes;
  }
}
