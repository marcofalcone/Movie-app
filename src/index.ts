import * as dotenv from 'dotenv'
dotenv.config()
import Fastify from 'fastify';
import bcrypt from './plugin/bcrypt';
import jwt from './plugin/jwt';
import mongo from './plugin/mongo';
import fastStatic from './plugin/static';
import routes from './routes';

const fastify = Fastify({
  logger: true
});

fastify.register(mongo);
fastify.register(jwt)
fastify.register(bcrypt)
fastify.register(routes);
fastify.register(fastStatic)

fastify.listen({ port: Number(process.env.PORT) || 5000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log('server started ...');
  }
});
