import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import typeormConfig from "./typeorm.config";
import { Context } from "./types/context";
import { auth } from "./middleware/auth";

typeormConfig.initialize().then((conn) => {
  console.log("connected to database");
  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      const token =
        req && req.headers?.authorization
          ? auth(req.headers.authorization)
          : null;
      return { conn, userId: token?.userId };
    },
  });
  server.listen(3000).then(({ url }) => {
    console.log(`server starting at ${url} 🚀 🎯`);
  });
});
