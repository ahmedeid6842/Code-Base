"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const auth_1 = require("./middleware/auth");
typeorm_config_1.default.initialize().then((conn) => {
    console.log("connected to database");
    const server = new apollo_server_1.ApolloServer({
        schema: schema_1.schema,
        context: ({ req }) => {
            var _a;
            const token = req && ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)
                ? (0, auth_1.auth)(req.headers.authorization)
                : null;
            return { conn, userId: token === null || token === void 0 ? void 0 : token.userId };
        },
    });
    server.listen(3000).then(({ url }) => {
        console.log(`server starting at ${url} 🚀 🎯`);
    });
});
