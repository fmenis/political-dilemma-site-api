import { FastifyInstance } from 'fastify'

import loginUseCase from './useCases/login.usecase'
import logoutUseCase from './useCases/logout.usecase'

export default async function index(fastify: FastifyInstance): Promise<void> {
  fastify.addHook('onRoute', options => {
    options.schema = {
      ...options.schema,
      tags: ['auth'],
    }
  })

  const prefix = '/v1/auth'

  fastify.register(loginUseCase, { prefix })
  fastify.register(logoutUseCase, { prefix })
}
