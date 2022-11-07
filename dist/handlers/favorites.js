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
const favorites = (fastify) => {
    var _a, _b;
    const collection = (_b = (_a = fastify === null || fastify === void 0 ? void 0 : fastify.mongo) === null || _a === void 0 ? void 0 : _a.db) === null || _b === void 0 ? void 0 : _b.collection('favoritesMovies');
    const getFavorites = {
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ user: req.params.user }));
                if (user)
                    reply.code(200).send({
                        code: 1,
                        list: user.favorites
                    });
                else
                    reply.code(200).send({
                        code: 0,
                        message: "User has not favorites yet"
                    });
            }
            catch (err) {
                reply.send(err);
            }
        })
    };
    const addFavorite = {
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ user: req.params.user }));
                console.log(user);
                if (user) {
                    yield (collection === null || collection === void 0 ? void 0 : collection.updateOne({ "user": req.params.user }, { $push: { favorites: req.body } }));
                }
                else
                    yield (collection === null || collection === void 0 ? void 0 : collection.insertOne({
                        user: req.params.user,
                        favorites: [req.body]
                    }));
                reply.code(200).send("Movie added to favorites");
            }
            catch (err) {
                reply.code(500).send(err);
            }
        })
    };
    const removeFavorite = {
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(req.params);
            yield (collection === null || collection === void 0 ? void 0 : collection.updateOne({ user: req.params.user }, { $pull: { favorites: { id: req.params.movieId } } }));
            reply.code(200).send("Movie removed from favorites");
        })
    };
    return {
        getFavorites,
        addFavorite,
        removeFavorite,
    };
};
exports.default = favorites;
