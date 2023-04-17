import { FastifyInstance } from "fastify";

import listArticles from "./useCases/list";

export default async function index(fastify: FastifyInstance) {
  fastify.addHook("onRoute", (options) => {
    options.schema = {
      ...options.schema,
      tags: ["articles"],
    };
  });

  const prefix = "/v1/articles";
  fastify.register(listArticles, { prefix });
}
