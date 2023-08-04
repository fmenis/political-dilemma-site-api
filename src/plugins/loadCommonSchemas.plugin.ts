import fp from 'fastify-plugin'

import { FastifyInstance } from 'fastify'
import {
  noContentSchema,
  acceptedSchema,
  paginatedResultsSchema,
  notFoundSchema,
  badRequestSchema,
  unauthorizedSchema,
  forbiddenSchema,
  conflictSchema,
  internalServerErrorSchema,
} from '../routes/common/schema.common'

async function loadSchemas(fastify: FastifyInstance) {
  fastify.addSchema(noContentSchema)
  fastify.addSchema(acceptedSchema)
  fastify.addSchema(paginatedResultsSchema)

  fastify.addSchema(notFoundSchema)
  fastify.addSchema(badRequestSchema)
  fastify.addSchema(unauthorizedSchema)
  fastify.addSchema(forbiddenSchema)
  fastify.addSchema(conflictSchema)
  fastify.addSchema(internalServerErrorSchema)
}

export default fp(loadSchemas)
