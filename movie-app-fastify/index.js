import * as dotenv from 'dotenv'
dotenv.config()
import Fastify from 'fastify';
import routes from './routes.js';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyMongo from '@fastify/mongodb';

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyMongo, {
  url: process.env.MONGO_URL
});
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
