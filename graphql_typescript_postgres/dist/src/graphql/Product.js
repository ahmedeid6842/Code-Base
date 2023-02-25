"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductMutation = exports.ProductQuery = exports.ProductType = void 0;
const nexus_1 = require("nexus");
const Product_1 = require("../entities/Product");
const User_1 = require("../entities/User");
exports.ProductType = (0, nexus_1.objectType)({
    name: "Product",
    definition(t) {
        t.nonNull.int("id"),
            t.nonNull.string("name"),
            t.nonNull.float("price"),
            t.nonNull.int("creatorId");
        t.field("createdBy", {
            type: "User",
            resolve(parent, args, context) {
                return User_1.User.findOne({ where: { id: parent.creatorId } });
            },
        });
    },
});
exports.ProductQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("products", {
            type: "Product",
            resolve(parent, args, { conn }, info) {
                return Product_1.Product.find();
            },
        });
    },
});
exports.CreateProductMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createProduct", {
            type: "Product",
            args: {
                name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                price: (0, nexus_1.nonNull)((0, nexus_1.floatArg)()),
            },
            resolve(parent, { name, price }, { userId }, info) {
                if (!userId) {
                    throw new Error("can't create product without loggin in");
                }
                return Product_1.Product.create({ name, price, creatorId: userId }).save();
            },
        });
    },
});
