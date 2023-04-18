import { FastifyInstance } from 'fastify'

import listArticles from './useCases/list'
import articleService from './article.service'

export default async function index(fastify: FastifyInstance) {
  fastify.addHook('onRoute', options => {
    options.schema = {
      ...options.schema,
      tags: ['articles'],
    }
  })

  await fastify.register(articleService)

  const prefix = '/v1/articles'
  fastify.register(listArticles, { prefix })
}
