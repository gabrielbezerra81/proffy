import ICreateClassDTO from "../dtos/ICreateClassDTO";
import Class from "../infra/typeorm/entities/Class";
import IFindByDaySubjectAndTimeDTO from "../dtos/IFindByDaySubjectAndTimeDTO";

export default interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
  findByDaySubjectAndTime(data: IFindByDaySubjectAndTimeDTO): Promise<Class[]>;
}
