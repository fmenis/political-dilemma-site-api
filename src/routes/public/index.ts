import { FastifyInstance } from 'fastify'

import articleRoutes from './articles/index'

export default async function index(fastify: FastifyInstance) {
  fastify.register(articleRoutes)
}
