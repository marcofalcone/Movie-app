import fastifyPlugin from 'fastify-plugin';
import fastifyBcrypt from 'fastify-bcrypt';
import { FastifyInstance } from 'fastify';

const bcrypt = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyBcrypt);
};

export default fastifyPlugin(bcrypt);
