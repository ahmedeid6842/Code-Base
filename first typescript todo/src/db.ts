import { MongoClient } from "mongodb";
import config from "config";

const MONGO_URI = config.get<string>("MONGO_URI");
const client = new MongoClient(MONGO_URI);
export const db = client.db();
