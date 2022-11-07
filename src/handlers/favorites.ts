import { FastifyInstance } from "fastify";

const favorites = (fastify: FastifyInstance) => {
  const collection = fastify?.mongo?.db?.collection('favoritesMovies');

  const getFavorites = {
    handler: async (req: any, reply: any) => {
      try {
        const user = await collection?.findOne({ user: req.params.user })
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
    handler: async (req: any, reply: any) => {
      try {
        const user = await collection?.findOne({ user: req.params.user})
        console.log(user)
        if (user) {
          await collection?.updateOne(
            { "user": req.params.user },
            { $push : { favorites: req.body }}
            );
        } else await collection?.insertOne({
          user: req.params.user,
          favorites: [req.body]
        })
        reply.code(200).send("Movie added to favorites")
      } catch(err) {
        reply.code(500).send(err)
      }
      
    } 
  };
  
  const removeFavorite = {
    handler: async (req: any, reply: any) => {
      console.log(req.params)
      await collection?.updateOne(
        { user: req.params.user },
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
