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
Object.defineProperty(exports, "__esModule", { value: true });
const users = (fastify) => {
    var _a, _b;
    const collection = (_b = (_a = fastify === null || fastify === void 0 ? void 0 : fastify.mongo) === null || _a === void 0 ? void 0 : _a.db) === null || _b === void 0 ? void 0 : _b.collection('users');
    const { hash, compare } = fastify.bcrypt; // default salt (10)
    const { sign, verify } = fastify.jwt;
    const getUsers = {
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            const list = yield (collection === null || collection === void 0 ? void 0 : collection.find({}).toArray());
            reply.send(list);
        })
    };
    const addUser = {
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ "user": req.body.username }));
                if (user) {
                    reply.code(400).send({
                        code: 0,
                        message: "User already registered"
                    });
                }
                else
                    yield (collection === null || collection === void 0 ? void 0 : collection.insertOne({
                        user: req.body.username,
                        password: yield hash(req.body.password),
                    }));
                reply.code(200).send({
                    code: 1,
                    message: "User created"
                });
            }
            catch (err) {
                reply.send(err);
            }
        })
    };
    const login = {
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ "user": req.body.username }));
                if (user) {
                    const passwordMatches = yield compare(req.body.password, user.password);
                    if (passwordMatches) {
                        const accessToken = sign(req.body, {
                            expiresIn: "1h",
                        });
                        reply.send({
                            code: 1,
                            message: "Login successfull",
                            user: user.user,
                            accessToken,
                        });
                    }
                    else {
                        reply.send({
                            code: 0,
                            message: "Incorrect password"
                        });
                    }
                }
                else {
                    reply.send({
                        code: 2,
                        message: "User does not exist"
                    });
                }
            }
            catch (err) {
                reply.send(err);
            }
        })
    };
    const auth = {
        handler: (req, rep) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                verify(req.body.accessToken);
                rep.send({
                    code: 1,
                    message: "User authorized"
                });
            }
            catch (err) {
                rep.code(401).send(err);
            }
        })
    };
    return {
        auth,
        getUsers,
        addUser,
        login,
    };
};
exports.default = users;
