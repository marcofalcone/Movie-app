import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';
import { FastifyInstance } from 'fastify';

const mongo = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyMongo, {
    url: process.env.MONGO_URL
  });
};

export default fastifyPlugin(mongo);
