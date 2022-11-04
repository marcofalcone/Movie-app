import fastifyPlugin from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from "path"
import { fileURLToPath } from 'url';

const fastStatic = async (fastify) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const buildPath = path.join(__dirname, '../frontend/build')
  await fastify.register(fastifyStatic, {
    root: buildPath
  });
};

export default fastifyPlugin(fastStatic);
