import Fastify from "fastify";
import env from "@fastify/env";

import { ConfigSchemaType, configSchema } from "./utils/env.schema";
import { buildServerOptions } from "./utils/serverOpts";
import app from "./app";

declare module "fastify" {
  interface FastifyInstance {
    config: ConfigSchemaType;
  }
}

const fastify = Fastify(buildServerOptions());

async function run() {
  await fastify.register(env, {
    dotenv: true,
    schema: configSchema,
  });

  await fastify.register(app);

  await fastify.ready();

  await fastify.listen({
    port: fastify.config.SERVER_PORT,
    host: fastify.config.SERVER_ADDRESS,
  });

  fastify.log.debug(
    `Server launched in '${fastify.config.NODE_ENV}' environment`
  );
}

run().catch((err) => {
  fastify.log.fatal(err);
  process.exit(1);
});

/**
 * ##TODO
 * - linter and formatter
 * - nodemon config file
 */
