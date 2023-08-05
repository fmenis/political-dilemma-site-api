import Fastify from 'fastify'
import env from '@fastify/env'
import closeWithGrace from 'close-with-grace'

import { ConfigSchemaType, configSchema } from './utils/env.schema'
import { buildServerOptions } from './utils/serverOpts'
import app from './app'

declare module 'fastify' {
  interface FastifyInstance {
    config: ConfigSchemaType
  }
}

const fastify = Fastify(buildServerOptions())
const { log } = fastify

closeWithGrace({ delay: 500 }, async ({ signal, err }) => {
  if (err) {
    log.error(err)
  }
  log.debug(`'${signal}' signal received. Gracefully closing fastify server`)
  await fastify.close()
})

async function run() {
  try {
    await fastify.register(env, {
      dotenv: true,
      schema: configSchema,
    })

    await fastify.register(app)
    await fastify.ready()

    await fastify.listen({
      port: fastify.config.SERVER_PORT,
      host: fastify.config.SERVER_ADDRESS,
    })

    log.debug(`Server launched in '${fastify.config.NODE_ENV}' environment`)
  } catch (error) {
    log.fatal(error)
    process.exit(1)
  }
}

run()

/**
 * ##TODO
 * - linter and formatter
 * - e2e test (seeding db)
 */
