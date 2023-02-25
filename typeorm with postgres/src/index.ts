import { createConnection } from "typeorm";
import config from "config";
import { Client } from "./entities/client";
import { Banker } from "./entities/banker";
import { Transaction } from "./entities/transaction";
import { createClientRouter } from "./routes/create_client";
import express from "express";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transction";
import { deleteClientRouter } from "./routes/delete_client";
const app = express();

app.use(express.json());
app.use(createClientRouter);
app.use(createBankerRouter);
app.use(createTransactionRouter);
app.use(deleteClientRouter);

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "ahmed",
  database: "typeorm",
  entities: [Client, Banker, Transaction],
  synchronize: process.env.NODE_ENV === "production" ? false : true,
})
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => console.log("your server starts on port 3000"));
  })
  .catch((err) => {
    throw new Error("can't connected to database");
  });
