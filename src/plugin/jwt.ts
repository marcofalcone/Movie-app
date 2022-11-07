import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt'
import { FastifyInstance } from 'fastify';

const jwt = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET ?? ""
  });
};

export default fastifyPlugin(jwt);
