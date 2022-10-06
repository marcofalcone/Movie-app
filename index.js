import * as dotenv from 'dotenv'
dotenv.config()
import Fastify from 'fastify';
import routes from './routes.js';
import bcrypt from './plugin/bcrypt.js';
import mongo from './plugin/mongo.js';
import jwt from './plugin/jwt.js';
import fastStatic from "./plugin/static.js"


const fastify = Fastify({
  logger: true
});

fastify.register(mongo);
fastify.register(jwt)
fastify.register(bcrypt)
fastify.register(routes);
fastify.register(fastStatic)

fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log('server started ...');
  }
});
