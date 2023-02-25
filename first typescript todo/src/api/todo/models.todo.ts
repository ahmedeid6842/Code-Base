import * as zod from "zod";
import { ObjectId } from "mongodb";
import { db } from "../../db";
import { WithId } from "mongodb";

export const TodoSchema = zod.object({
  content: zod.string().min(1),
  done: zod.boolean().default(false),
});

export const paramsWithId = zod.object({
  id: zod
    .string()
    .min(1)
    .refine(
      (val) => {
        try {
          return new ObjectId(val);
        } catch (error) {
          return false;
        }
      },
      {
        message: "Invalid ObjectId",
      }
    ),
});

export type ParamsWithId = zod.infer<typeof paramsWithId>;
export type Todo = zod.infer<typeof TodoSchema>;
export const Todos = db.collection<Todo>("todos");
export type TodoWithId = WithId<Todo>;
