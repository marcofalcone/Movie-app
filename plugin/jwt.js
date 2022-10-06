import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt'

const jwt = async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
  });
};

export default fastifyPlugin(jwt);
