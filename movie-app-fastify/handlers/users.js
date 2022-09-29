const users = (fastify) => {
  const collection = fastify.mongo.db.collection('users');
  const { hash } = fastify.bcrypt;

  const getUsers = {
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
  
  const addUser = {
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
      await collection.insertOne({
        username: req.body.username,
        password: await hash(req.body.password)
      })
      reply.code(200).send("User created")
    } 
  };
  
  const removeUser = {
    // schema: { id: {type: "string"}},
    handler: async (req, reply) => {
      await collection.deleteOne({ "id": req.params.id })
      reply.code(200).send("Movie removed from favorites")
    } 
  };

  return {
    getUsers,
    addUser,
    removeUser ,
  };
};

export default users;
