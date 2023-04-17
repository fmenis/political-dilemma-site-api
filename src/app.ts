import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";

import apiPlugin from "./routes/index";

export default async function app(fastify: FastifyInstance): Promise<void> {
  //##TODO tune options
  fastify.register(cors);

  fastify.register(sensible);

  fastify.register(helmet);

  //##TODO sentry

  await fastify.register(apiPlugin, { prefix: "/api" });
}
