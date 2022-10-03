import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt'

const jwt = async (fastify, options) => {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
  });
};

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(jwt);
