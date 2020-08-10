import ICreateClassScheduleDTO from "../dtos/ICreateClassScheduleDTO";
import ClassSchedule from "../infra/typeorm/entities/ClassSchedule";
import Class from "../infra/typeorm/entities/Class";

export default interface IClassesSchedulesRepository {
  create(data: ICreateClassScheduleDTO): Promise<ClassSchedule[]>;
}
