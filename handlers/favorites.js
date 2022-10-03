const favorites = (fastify) => {
  const collection = fastify.mongo.db.collection('favoritesMovies');

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
      try {
        const list = await collection.find({}).toArray()
      reply.code(200).send(list)
      } catch (err) {
        reply.send(err)
      }
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
      await collection.insertOne(req.body)
      reply.code(200).send("Movie added to favorites")
    } 
  };
  
  const removeFavorite = {
    schema: { id: {type: "string"}},
    handler: async (req, reply) => {
      await collection.deleteOne({ "id": req.params.id })
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
