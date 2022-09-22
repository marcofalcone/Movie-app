import {getFavorites, addFavorite, removeFavorite} from './handlers/favorites.js';

const routes = async (fastify, options, done) => {
  const collection = fastify.mongo.db.collection('favoritesMovies');

  fastify.get('/api/movies/favorites', getFavorites(collection));

  fastify.post('/api/movies/favorites', addFavorite(collection));

  fastify.delete('/api/movies/favorites/:id', removeFavorite(collection));

  done();
};

export default routes;
