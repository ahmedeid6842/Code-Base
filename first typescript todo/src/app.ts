import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import api from "./api";
import * as middlewares from "./middlewares";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", api);
app.use(middlewares.errorHandler);

export default app;
