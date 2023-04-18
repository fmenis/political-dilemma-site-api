import { FastifyInstance } from "fastify";

import publicRoutes from "./public/index";
import protectedRoutes from "./protected/index";
import swaggerPlugin from "../plugins/swagger.plugin";
import prismaPlugin from "../plugins/prisma.plugin";

export default async function index(fastify: FastifyInstance) {
  //##TODO
  // fastify.register(commonHooks)

  await fastify.register(swaggerPlugin);
  await fastify.register(prismaPlugin);

  await fastify.register(publicRoutes, { prefix: "public" });
  await fastify.register(protectedRoutes);
}
