import { DataSource } from "typeorm";

export type Context = {
  conn: DataSource;
  userId: number|undefined;
};
