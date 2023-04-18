import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";
import {
  ListArticlesType,
  listArticlesQuerystring,
} from "../lib/article.schema";

export default async function listArticles(
  fastify: FastifyInstance,
  opts: RegisterOptions
) {
  //   const { productService } = fastify;
  const { prisma } = fastify;

  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      querystring: listArticlesQuerystring,
      //##TODO
      //   response: {
      //     200: productDetails,
      //   },
    },
    handler: onListArticles,
  });

  async function onListArticles(
    req: FastifyRequest<{ Querystring: ListArticlesType }>,
    reply: FastifyReply
  ): Promise<any> {
    const articles = await prisma.articles.findMany();
    return articles;
  }
}
