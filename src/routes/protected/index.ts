import { FastifyInstance } from 'fastify'
import { Type } from '@sinclair/typebox'

import authenticationPlugin from '../../plugins/authentication.plugin'
import authRoutes from './auth/index'

export default async function index(fastify: FastifyInstance) {
  fastify.addHook('onRoute', options => {
    if (!options.config?.public) {
      options.schema = {
        ...options.schema,
        headers: Type.Object(
          {
            cookie: Type.String(),
          },
          { additionalProperties: false }
        ),
      }
    }
  })

  await fastify.register(authenticationPlugin)

  await fastify.register(authRoutes)
}
