import { extendType, nonNull, objectType, stringArg } from "nexus";
import { User } from "../entities/User";
import { Context } from "../types/context";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

export const AuthType = objectType({
  name: "AuthType",
  definition(t) {
    t.nonNull.string("token"),
      t.nonNull.field("user", {
        type: "User",
      });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthType",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, { username, password }, context, info) {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new Error("User not found");
        }
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          throw new Error("invlid password");
        }
console.log(config.get<string>("JWT_SECRET"));
        const token = await jwt.sign(
          { userId: user.id },
          config.get<string>("JWT_SECRET")
        );

        return {
          token,
          user,
        };
      },
    });
    t.nonNull.field("register", {
      type: "AuthType",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      async resolve(
        parent,
        { username, password, email },
        context: Context,
        info
      ) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        let result = await context.conn
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username,
            password,
            email,
          })
          .returning("*")
          .execute();
        let user = result.raw[0];

        const token = await jwt.sign(
          { userId: user.id },
          config.get<string>("JWT_SECRET")
        );
        return {
          user,
          token,
        };
      },
    });
  },
});
