const favorites = (fastify) => {
  const {
    find,
    insertOne,
    deleteOne
  } = fastify.mongo.db.collection('favoritesMovies');

  const getFavorites = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              poster_path: { type: "string" },
              overview: { type: "string" },
              vote_average: { type: "string" },
              release_date: { type: "string" },
              title: { type: "string" },
              id: { type: "string" },
            }
          }
        }
      }
    },
    handler: async (req, reply) => {
      const list = await find({}).toArray()
      reply.send(list)
    } 
  };
  
  const addFavorite = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              poster_path: { type: "string" },
              overview: { type: "string" },
              vote_average: { type: "string" },
              release_date: { type: "string" },
              title: { type: "string" },
              id: { type: "string" },
            }
          }
        }
      }
    },
    handler: async (req, reply) => {
      await insertOne(req.body)
      reply.code(200).send("Movie added to favorites")
    } 
  };
  
  const removeFavorite = {
    schema: { id: {type: "string"}},
    handler: async (req, reply) => {
      await deleteOne({ "id": req.params.id })
      reply.code(200).send("Movie removed from favorites")
    } 
  };

  return {
    getFavorites,
    addFavorite,
    removeFavorite,
  };
};

export default favorites;
