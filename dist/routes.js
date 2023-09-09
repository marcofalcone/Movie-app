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
const favorites_1 = __importDefault(require("./handlers/favorites"));
const users_1 = __importDefault(require("./handlers/users"));
const routes = (fastify, options, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { getFavorites, addFavorite, removeFavorite } = (0, favorites_1.default)(fastify);
    const { addUser, getUsers, login, auth, } = (0, users_1.default)(fastify);
    fastify.setNotFoundHandler((req, res) => {
        res.sendFile('index.html');
    });
    fastify.get('/api/movies/favorites/:user', getFavorites);
    fastify.post('/api/movies/favorites/:user', addFavorite);
    fastify.delete('/api/movies/favorites/:user/:movieId', removeFavorite);
    fastify.get('/api/users', getUsers);
    fastify.post('/api/users', addUser);
    fastify.post('/api/users/login', login);
    fastify.post('/api/users/auth', auth);
    done();
});
exports.default = routes;
