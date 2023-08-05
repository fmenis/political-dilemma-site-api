import fp from 'fastify-plugin'

import {
  FastifyError,
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify'
import { IClientHttpError } from '../routes/common/interface.common'
import { trimObjectFields } from '../common/utils'

declare module 'fastify' {
  interface FastifyRequest {
    resource: any
  }
  interface FastifyContextConfig {
    trimBodyFields: string[] | undefined
  }
}

async function commonHooks(fastify: FastifyInstance) {
  /**
   * Empty object that can be utilized to pass object between hook
   */
  fastify.addHook('onRequest', async req => {
    req.resource = {}
  })

  /**
   * Additional request logs and trim target body fields
   */
  fastify.addHook(
    'preValidation',
    async (req: FastifyRequest, reply: FastifyReply) => {
      //##TODO
      // const { body, log, user } = req
      // if (user) {
      //   log.debug(
      //     {
      //       id: user.id,
      //       email: user.email,
      //     },
      //     'user'
      //   )
      // }
      // if (fastify.config.ENABLE_BODY_LOG && body) {
      //   log.debug(body, 'parsed body')
      // }
      // if (reply.context.config.trimBodyFields) {
      //   req.body = trimObjectFields(reply.context.config.trimBodyFields, req.body)
      // }
      if (req.routeConfig.trimBodyFields) {
        req.body = trimObjectFields(req.routeConfig.trimBodyFields, req.body)
      }
    }
  )

  /**
   * Set common routes stuff
   */
  fastify.addHook('onRoute', options => {
    options.schema = {
      ...options.schema,
      response: {
        ...options!.schema!.response!,
        400: fastify.getSchema('sBadRequest'),
        500: fastify.getSchema('sInternalServerError'),
      },
    }
    //##TODO impostare quando decisa autenticazione
    // if (!options.config.public) {
    //   options.schema = {
    //     ...options.schema,
    //     headers: S.object()
    //       .additionalProperties(true)
    //       .prop('Cookie', S.string())
    //       .description('Authentication cookie header.')
    //       .required(),
    //   }
    // }
  })

  /**
   * Log validation errors
   */
  fastify.addHook(
    'onError',
    async (req: FastifyRequest, reply: FastifyReply, error: FastifyError) => {
      const clientError: Partial<IClientHttpError> = { ...error }
      clientError.internalCode = clientError.internalCode || '0000'
      clientError.details = clientError.details || {}
      clientError.message =
        reply.statusCode === 500
          ? 'Something went wrong...'
          : clientError.message
      if (clientError.validation) {
        clientError.details.validation = error.validation
      }
    }
  )
}

export default fp(commonHooks)
