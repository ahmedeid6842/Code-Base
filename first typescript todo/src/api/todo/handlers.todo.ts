import { Request, Response, NextFunction } from "express";
import { resourceLimits } from "worker_threads";
import { Todo, Todos, TodoWithId, ParamsWithId } from "./models.todo";
import { ObjectId } from "mongodb";
import { nextTick } from "process";

export async function findAll(req: Request, res: Response<TodoWithId[]>) {
  const result = await Todos.find().toArray();

  res.json(result);
}

export async function createOne(
  req: Request<{}, TodoWithId, Todo>,
  res: Response<TodoWithId>,
  next: NextFunction
) {
  try {
    const todo = await Todos.insertOne(req.body);
    res.json({
      _id: todo.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOne(
  req: Request<{ id: string }>,
  res: Response<TodoWithId>,
  next: NextFunction
) {
  try {
    const todo = await Todos.findOne({ _id: new ObjectId(req.params.id) });
    if (!todo) {
      res.status(404);
      throw new Error("not found");
    }
    return res.send(todo);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, TodoWithId, Todo>,
  res: Response<TodoWithId>,
  next: NextFunction
) {
  try {
    const result = await Todos.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        returnDocument: "after",
      }
    );
    if (!result.value) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction
) {
  try {
    const result = await Todos.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
