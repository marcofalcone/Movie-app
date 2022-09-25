import favorites from "./handlers/favorites.js";

const routes = async (fastify, options, done) => {
  const {
    getFavorites,
    addFavorite,
    removeFavorite
  } = favorites(fastify)
  
  fastify.get('/api/movies/favorites', getFavorites);

  fastify.post('/api/movies/favorites', addFavorite);

  fastify.delete('/api/movies/favorites/:id', removeFavorite);

  done();
};

export default routes;
