import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

async function prisma(fastify: FastifyInstance): Promise<void> {
  const prisma = new PrismaClient({
    log: ['error', 'query', 'info', 'query'],
  })

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect()
  })

  fastify.decorate('prisma', prisma)
}

export default fp(prisma)
