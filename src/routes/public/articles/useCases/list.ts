import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from 'fastify'
import {
  ListArticlesQuerystringType,
  listArticlesQuerystring,
} from '../lib/article.schema'

export default async function listArticles(
  fastify: FastifyInstance,
  opts: RegisterOptions
) {
  const { articleService } = fastify

  fastify.route({
    url: '/',
    method: 'GET',
    schema: {
      querystring: listArticlesQuerystring,
      response: {
        //##TODO 200
        404: fastify.getSchema('notFoundSchema'),
      },
    },
    handler: onListArticles,
  })

  async function onListArticles(
    req: FastifyRequest<{ Querystring: ListArticlesQuerystringType }>,
    reply: FastifyReply
  ): Promise<any> {
    const { limit, offset } = req.query

    return articleService.list({
      pagination: {
        limit,
        offset,
      },
    })
  }
}
