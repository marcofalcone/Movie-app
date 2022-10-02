import fastifyPlugin from 'fastify-plugin';
import fastifyBcrypt from 'fastify-bcrypt';

const bcrypt = async (fastify, options) => {
  await fastify.register(fastifyBcrypt);
};

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(bcrypt);
