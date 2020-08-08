export default interface ICreateClassDTO {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
  schedule: Array<{
    week_day: number;
    from: string;
    to: string;
  }>;
}
