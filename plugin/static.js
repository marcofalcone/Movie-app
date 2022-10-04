import fastifyPlugin from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from "path"
import { fileURLToPath } from 'url';

const fastStatic = async (fastify, options) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const buildPath = path.join(__dirname, '../react/build')
  await fastify.register(fastifyStatic, {
    root: buildPath
  });
};

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(fastStatic);
