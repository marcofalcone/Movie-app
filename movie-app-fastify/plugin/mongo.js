import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';

const mongo = async (fastify, options) => {
  await fastify.register(fastifyMongo, {
    url: process.env.MONGO_URL
  });
};

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(mongo);
