export default interface ICreateClassScheduleDTO {
  schedule: Array<{
    week_day: number;
    from: number;
    to: number;
    class_id: string;
  }>;
}
