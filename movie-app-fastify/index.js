import * as dotenv from 'dotenv'
dotenv.config()
import Fastify from 'fastify';
import routes from './routes.js';
import dbConnector from './plugins/dbConnector.js';

const fastify = Fastify({
  logger: true
});

fastify.register(dbConnector);
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
