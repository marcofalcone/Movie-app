import fastifyPlugin from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from "path"
import { FastifyInstance } from 'fastify';

const fastStatic = async (fastify: FastifyInstance) => {
  const buildPath = path.join(__dirname, '../../frontend/build')
  await fastify.register(fastifyStatic, {
    root: buildPath,
  });
};

export default fastifyPlugin(fastStatic);
