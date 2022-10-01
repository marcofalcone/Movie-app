import * as dotenv from 'dotenv'
dotenv.config()
import Fastify from 'fastify';
import routes from './routes.js';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyMongo from '@fastify/mongodb';
import fastifyJwt from '@fastify/jwt'

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyMongo, {
  url: process.env.MONGO_URL
});
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET
})
fastify.register(fastifyBcrypt)
fastify.register(routes);

// Run the server!
fastify.listen({ port: process.env.PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log('server started ...');
  }
});
