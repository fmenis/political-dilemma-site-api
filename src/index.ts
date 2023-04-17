import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import env from "@fastify/env";

import { ConfigSchemaType, configSchema } from "./utils/env.schema";
import { buildServerOptions } from "./utils/serverOpts";

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

  fastify.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    return "Hello World!";
  });

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
 */
