import favorites from "./handlers/favorites.js";
import users from "./handlers/users.js";

const routes = async (fastify, options, done) => {
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
    logout,
  } = users(fastify)

  fastify.setNotFoundHandler((req, res) => {
    res.sendFile('index.html')
  })
  
  fastify.get('/api/movies/favorites/:user', getFavorites);

  fastify.post('/api/movies/favorites/:user', addFavorite);

  fastify.delete('/api/movies/favorites/:user/:movieId', removeFavorite);

  fastify.get('/api/users', getUsers);

  fastify.post('/api/users', addUser);

  fastify.put("/api/users/logout/:user", logout)

  // fastify.delete('/api/users/:id', removeFavorite);

  fastify.post('/api/users/login', login);

  fastify.post('/api/users/auth', auth);

  // fastify.post("/login")

  done();
};

export default routes;
