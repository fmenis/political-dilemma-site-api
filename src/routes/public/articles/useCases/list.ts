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
    handler: onCreateProduct,
  });

  async function onCreateProduct(
    req: FastifyRequest<{ Querystring: ListArticlesType }>,
    reply: FastifyReply
  ): Promise<ListArticlesType> {
    return {
      id: "afe6ba1c-db74-4ffb-82f5-d2210e885caa",
      title: "Foo",
    };
  }
}
