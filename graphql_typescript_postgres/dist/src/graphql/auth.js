"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMutation = exports.AuthType = void 0;
const nexus_1 = require("nexus");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
exports.AuthType = (0, nexus_1.objectType)({
    name: "AuthType",
    definition(t) {
        t.nonNull.string("token"),
            t.nonNull.field("user", {
                type: "User",
            });
    },
});
exports.AuthMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", {
            type: "AuthType",
            args: {
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve(parent, { username, password }, context, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield User_1.User.findOne({ where: { username } });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const valid = yield bcrypt_1.default.compare(password, user.password);
                    if (!valid) {
                        throw new Error("invlid password");
                    }
                    console.log(config_1.default.get("JWT_SECRET"));
                    const token = yield jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.get("JWT_SECRET"));
                    return {
                        token,
                        user,
                    };
                });
            },
        });
        t.nonNull.field("register", {
            type: "AuthType",
            args: {
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve(parent, { username, password, email }, context, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    password = yield bcrypt_1.default.hash(password, salt);
                    let result = yield context.conn
                        .createQueryBuilder()
                        .insert()
                        .into(User_1.User)
                        .values({
                        username,
                        password,
                        email,
                    })
                        .returning("*")
                        .execute();
                    let user = result.raw[0];
                    const token = yield jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.get("JWT_SECRET"));
                    return {
                        user,
                        token,
                    };
                });
            },
        });
    },
});
