import { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from "uuid";

const users = (fastify: FastifyInstance) => {
  const collection = fastify?.mongo?.db?.collection('users');
  const { hash, compare } = fastify.bcrypt; // default salt (10)
  const { sign, verify } = fastify.jwt;

  const getUsers = {
    handler: async (req: any, reply: any) => {
      const list = await collection?.find({}).toArray()
      reply.send(list)
    } 
  };
  
  const addUser = {
    handler: async (req: any, reply: any) => {
      try {
        const user = await collection?.findOne({ "user": req.body.username });
        if (user) {
          reply.code(400).send({
            code: 0,
            message: "User already registered"
          })
        } else
        await collection?.insertOne({
          user: req.body.username,
          password: await hash(req.body.password),
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
    handler: async (req: any, reply: any) => {
      try {
        const user = await collection?.findOne({ "user": req.body.username });
        if (user) {
          const passwordMatches = await compare(req.body.password, user.password)
          if (passwordMatches) {
            const accessToken = sign(req.body, {
              expiresIn: "1h",
            })
            reply.send(
              { 
                code: 1,
                message: "Login successfull",
                user: user.user,
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
    handler: async (req: any, rep: any) => {
      try {
        verify(req.body.accessToken)
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
