import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { getServerVersion } from "../utils/main";

async function swagger(fastify: FastifyInstance): Promise<void> {
  const version = getServerVersion();

  await fastify.register(fastifySwagger, {
    mode: "dynamic",
    openapi: {
      info: {
        title: "PoliticalDilemma site APi",
        description: "##TODO",
        version,
        contact: {
          name: "Filippo Menis",
          email: "filippomeniswork@gmail.com",
        },
      },
      externalDocs: {
        description: "Find more info here",
        url: "##TODO",
      },
      servers: [
        {
          url: "http:127.0.0.1:3000",
          description: "Local server",
        },
      ],
      tags: [
        { name: "articles", description: "Articles related end-points" },
      ].sort((a, b) => a.name.localeCompare(b.name)),
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/doc",
    initOAuth: {},
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
}

export default fp(swagger);
