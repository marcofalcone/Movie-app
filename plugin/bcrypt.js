import fastifyPlugin from 'fastify-plugin';
import fastifyBcrypt from 'fastify-bcrypt';

const bcrypt = async (fastify) => {
  await fastify.register(fastifyBcrypt);
};

export default fastifyPlugin(bcrypt);
