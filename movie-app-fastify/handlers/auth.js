const auth = (fastify) => {
  const collection = fastify.mongo.db.collection('users');

  const getUser = {
    // schema: {
    //   response: {
    //     200: {
    //       type: "array",
    //       items: {
    //         type: "object",
    //         properties: {
    //           poster_path: { type: "string" },
    //           overview: { type: "string" },
    //           vote_average: { type: "string" },
    //           release_date: { type: "string" },
    //           title: { type: "string" },
    //           id: { type: "string" },
    //         }
    //       }
    //     }
    //   }
    // },
    handler: async (req, reply) => {
      const list = await collection.find({}).toArray()
      reply.send(list)
    } 
  };

  return {
    getUser,
    addUser,
    removeUser ,
  };
};

export default favorites;
