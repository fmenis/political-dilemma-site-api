import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { IListParams } from '../../common/interface.common'

declare module 'fastify' {
  interface FastifyInstance {
    articleService: {
      list(params: IListArticlesParams): Promise<IArticleListResult[]>
    }
  }
}

interface IArticleListResult {
  id: string
  title: string
  status: string
  createdAt: Date
  category: string
}

export interface IListArticlesParams extends IListParams {}

async function articleService(fastify: FastifyInstance): Promise<void> {
  const { prisma /*, commonClientErrors*/ } = fastify

  async function list(
    params: IListArticlesParams
  ): Promise<IArticleListResult[]> {
    const { pagination } = params

    //It works!!
    // commonClientErrors.throwNotFoundError({ id: 'uuid', name: 'articles' })

    const articles = await prisma.articles.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        categories: {
          select: {
            name: true,
          },
        },
      },
      take: pagination.limit,
      skip: pagination.offset,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return articles.map(article => ({
      id: article.id,
      title: article.title,
      category: article.categories.name,
      status: article.status,
      createdAt: article.createdAt!,
    }))
  }

  fastify.decorate('articleService', {
    list,
  })
}

export default fp(articleService)
