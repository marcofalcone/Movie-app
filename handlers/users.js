import { v4 as uuidv4 } from 'uuid';

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
          email: req.body.email,
          password: await hash(req.body.password),
          tokenSalt: uuidv4()
        })
        reply.code(200).send({
          code: 1,
          message: "User created"
        })
      } catch (err) {
        reply.send(err)
      }
    } 
  };
  
  const login = {
    // schema: { id: {type: "string"}},
    handler: async (req, reply) => {
      try {
        const user = await collection.findOne({ "email": req.body.email });
        if (user) {
          const passwordMatches = await compare(req.body.password, user.password)
          if (passwordMatches) {
            const accessToken = sign(req.body, {
              expiresIn: "10m",
              key: `${process.env.JWT_SECRET}.${user.tokenSalt}`
            })
            reply.send(
              { 
                code: 1,
                message: "Login successfull",
                username: user.username,
                email: user.email,
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

  const logout = {
    handler: async (req, rep) => {
      try {
        await collection.findOneAndUpdate(
          { "email": req.params.id },
          { $set : { tokenSalt: uuidv4() }}
          );
        rep.code(200).send({
          code: 1,
          message: "Logout successfull"
        })
      } catch (err) {
        rep.code(500).send(err)
      }
    }
  }

  const auth = {
    handler: async (req, rep) => {
      try {
        const user = await collection.findOne({ "email": req.body.email });
        await verify(req.body.accessToken, {
          key: `${process.env.JWT_SECRET}.${user.tokenSalt}`
        })
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
    logout,
  };
};

export default users;