import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default async function login(fastify: FastifyInstance): Promise<void> {
  fastify.route({
    url: '/login',
    method: 'POST',
    config: {
      public: true,
    },
    schema: {
      response: {
        204: fastify.getSchema('sNoContent'),
      },
    },
    handler: onLogin,
  })

  async function onLogin(req: FastifyRequest, reply: FastifyReply) {
    //##TODO
    reply.setCookie('session', 'sessionId')
    reply.code(204)
  }
}
