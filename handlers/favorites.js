const favorites = (fastify) => {
  const collection = fastify.mongo.db.collection('favoritesMovies');

  const getFavorites = {
    handler: async (req, reply) => {
      try {
        const user = await collection.findOne({ email: req.params.email })
        if (user) reply.code(200).send({
          code: 1,
          list: user.favorites
        })
        else reply.code(200).send({
          code: 0,
          message: "User has not favorites yet"
        })
      } catch (err) {
        reply.send(err)
      }
    } 
  };
  
  const addFavorite = {
    handler: async (req, reply) => {
      try {
        const user = await collection.findOne({ email: req.params.email})
        console.log(user)
        if (user) {
          await collection.updateOne(
            { "email": req.params.email },
            { $push : { favorites: req.body }}
            );
        } else await collection.insertOne({
          email: req.params.email,
          favorites: [req.body]
        })
        reply.code(200).send("Movie added to favorites")
      } catch(err) {
        reply.code(500).send(err)
      }
      
    } 
  };
  
  const removeFavorite = {
    handler: async (req, reply) => {
      console.log(req.params)
      await collection.updateOne(
        { email: req.params.email },
        { $pull: { favorites: { id: req.params.movieId }}}
      )
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
