import { createConnection } from "typeorm";

export default async function connection() {
  await createConnection();
  console.log("Connection to Postgres created!");
}
