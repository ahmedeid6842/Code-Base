import { DataSource } from "typeorm";
import config from "config";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

export default new DataSource({
  type: "postgres",
  url: config.get<string>("CONNECTION_STRING"),
  entities: [Product,User],
  synchronize: true, //this option only in development
});
