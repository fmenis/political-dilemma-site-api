import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default async function logout(fastify: FastifyInstance): Promise<void> {
  fastify.route({
    url: '/logout',
    method: 'POST',
    schema: {
      response: {
        204: fastify.getSchema('sNoContent'),
      },
    },
    handler: onLogout,
  })

  async function onLogout(req: FastifyRequest, reply: FastifyReply) {
    //##TODO
    reply.setCookie('session', 'sessionId')
    reply.code(204)
  }
}
