const users = (fastify) => {
  const collection = fastify.mongo.db.collection('users');
  const { hash, compare } = fastify.bcrypt; // default salt (10)
  const { sign, verify } = fastify.jwt;

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
      try {
        await collection.insertOne({
          username: req.body.username,
          password: await hash(req.body.password)
        })
        reply.code(200).send("User created")
      } catch (err) {
        reply.send(err)
      }
      
    } 
  };
  
  const login = {
    // schema: { id: {type: "string"}},
    handler: async (req, reply) => {
      try {
        const res = await collection.findOne({ "username": req.body.username });
        if (res) {
          const passwordMatches = await compare(req.body.password, res.password)
          if (passwordMatches) {
            const accessToken = sign(req.body, { expiresIn: "1h"})
            reply.send(
              { 
                code: 1,
                message: "Login successfull",
                accessToken,
              }
              )
          } else {
            reply.send(
              {
                code: 0,
                message: "Incorrect password"
              }
            )
          }
        } else {
          reply.send({
            code: 2,
            message: "User does not exist"
          })
        }
      } catch (err) {
        reply.send(err)
      }
    } 
  };

  const auth = {
    handler: async (req, rep) => {
      try {
        await verify(req.body.accessToken, process.env.JWT_SECRET)
        rep.send({
          code: 1,
          message: "User authorized"
        })
      } catch (err) {
        rep.code(401).send(err)
      }
    }
  }

  return {
    auth,
    getUsers,
    addUser,
    login,
  };
};

export default users;
