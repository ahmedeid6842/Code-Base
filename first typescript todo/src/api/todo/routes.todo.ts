import { Router } from "express";
import * as TodoHandlers from "./handlers.todo";
import validateRequest from "../validateResource";
import { TodoSchema, paramsWithId } from "./models.todo";
const route = Router();

route.get("/", TodoHandlers.findAll);
route.post("/", validateRequest({ body: TodoSchema }), TodoHandlers.createOne);
route.get(
  "/:id",
  validateRequest({ params: paramsWithId }),
  TodoHandlers.getOne
);
route.put(
  "/:id",
  validateRequest({ body: TodoSchema, params: paramsWithId }),
  TodoHandlers.updateOne
);

route.delete(
  "/:id",
  validateRequest({
    params: paramsWithId,
  }),
  TodoHandlers.deleteOne
);

export default route;
