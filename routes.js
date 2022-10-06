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
  
  fastify.get('/api/movies/favorites/:email', getFavorites);

  fastify.post('/api/movies/favorites/:email', addFavorite);

  fastify.delete('/api/movies/favorites/:email/:movieId', removeFavorite);

  fastify.get('/api/users', getUsers);

  fastify.post('/api/users', addUser);

  fastify.put("/api/users/logout/:id", logout)

  // fastify.delete('/api/users/:id', removeFavorite);

  fastify.post('/api/users/login', login);

  fastify.post('/api/users/auth', auth);

  // fastify.post("/login")

  done();
};

export default routes;
