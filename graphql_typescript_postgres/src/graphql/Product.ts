import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { Context } from "../types/context";

export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("name"),
      t.nonNull.float("price"),
      t.nonNull.int("creatorId");
    t.field("createdBy", {
      type: "User",
      resolve(parent, args, context): Promise<User | null> {
        return User.findOne({ where: { id: parent.creatorId } });
      },
    });
  },
});

export const ProductQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("products", {
      type: "Product",
      resolve(parent, args, { conn }: Context, info): Promise<Product[]> {
        return Product.find();
      },
    });
  },
});

export const CreateProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createProduct", {
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        price: nonNull(floatArg()),
      },
      resolve(
        parent,
        { name, price },
        {userId}:Context,
        info
      ): Promise<Product> {
        if (!userId) {
          throw new Error("can't create product without loggin in");
        }
        return Product.create({ name, price, creatorId: userId }).save();
      },
    });
  },
});
