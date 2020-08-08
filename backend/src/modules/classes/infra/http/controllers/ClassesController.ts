import { Request, Response } from "express";
import convertHourToMinutes from "utils/convertHourToMinutes";

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

    // Criar user
    // Criar class
    // Criar Schedule

    const classSchedule = schedule.map((scheduleItem: any) => {
      return {
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      };
    });

    return response.json({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    });
  }
}
