import { Router } from "express";
import todos from "./todo/routes.todo";

const route = Router();

route.use("/todos", todos);
export default route;
