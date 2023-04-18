import { FastifyServerOptions } from 'fastify'

export function buildServerOptions(): FastifyServerOptions {
  return {
    logger: {
      level: process.env.LOG_LEVEL,
    },
    ajv: {
      customOptions: {
        allErrors: true,
      },
    },
  }
}
