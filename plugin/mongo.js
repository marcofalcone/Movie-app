import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';

const mongo = async (fastify) => {
  await fastify.register(fastifyMongo, {
    url: process.env.MONGO_URL
  });
};

export default fastifyPlugin(mongo);
