import fp from 'fastify-plugin'

import { FastifyInstance } from 'fastify'
import { notFoundSchema } from '../routes/common/schema.common'

async function loadSchemas(fastify: FastifyInstance) {
  fastify.addSchema(notFoundSchema)
}

export default fp(loadSchemas)
