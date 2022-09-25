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
      const list = await collection.find({}).toArray()
      reply.send(list)
    } 
  };
  
  const addFavorite = {
    schema: {},
    handler: async (req, reply) => {
      const res = await collection.insertOne(req.body)
      if (res) reply.send("movie added")
    } 
  };
  
  const removeFavorite = {
    schema: { id: {type: "number"}},
    handler: async (req, reply) => {
      const res = await collection.deleteOne({ "id": req.params.id })
      if (res) reply.send(typeof (req.params.id))
    } 
  };

  return {
    getFavorites,
    addFavorite,
    removeFavorite,
  };
};

export default favorites;
