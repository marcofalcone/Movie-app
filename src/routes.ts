import { FastifyInstance } from "fastify";
import favorites from "./handlers/favorites";
import users from "./handlers/users";

const routes = async (fastify: FastifyInstance, options: any, done: any) => {
  const {
    getFavorites,
    addFavorite,
    removeFavorite
  } = favorites(fastify)

  const {
    addUser,
    getUsers,
    login,
    auth,
  } = users(fastify)

  fastify.setNotFoundHandler((req, res) => {
    res.sendFile('index.html')
  })
  
  fastify.get('/api/movies/favorites/:user', getFavorites);

  fastify.post('/api/movies/favorites/:user', addFavorite);

  fastify.delete('/api/movies/favorites/:user/:movieId', removeFavorite);

  fastify.get('/api/users', getUsers);

  fastify.post('/api/users', addUser);

  fastify.post('/api/users/login', login);

  fastify.post('/api/users/auth', auth);

  done();
};

export default routes;
