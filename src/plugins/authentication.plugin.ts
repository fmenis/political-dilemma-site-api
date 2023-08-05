import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import cookie from '@fastify/cookie'
import dayjs from 'dayjs'

import { ENV } from '../common/enum'

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      first_name: string
      last_name: string
      email: string
      is_blocked: boolean
      is_deleted: boolean
    }
  }
}

async function authentication(fastify: FastifyInstance): Promise<void> {
  const { prisma, config } = fastify

  fastify.register(cookie, {
    secret: config.SECRET,
  })

  async function authenticate(req: FastifyRequest, reply: FastifyReply) {
    const { log } = req

    if (req.routeConfig.public || config.NODE_ENV === ENV.TEST) {
      return
    }

    const cookie = req.cookies.session
    if (!cookie) {
      log.debug(`Invalid access: cookie not found`)
      // throw createError(401, 'Invalid access', {
      //   internalCode: '0004',
      // })
    }

    const unsignedCookie = req.unsignCookie(cookie!)
    if (!unsignedCookie.valid) {
      log.debug(`Invalid access: malformed cookie`)
      // throw createError(401, 'Invalid access', {
      //   internalCode: '0005',
      // })
    }

    const { value: sessionId } = unsignedCookie

    const session = await prisma.sessions.findFirst({
      where: { id: sessionId! },
    })
    if (!session) {
      log.debug(`Invalid access: session not found`)
      // throw createError(401, 'Invalid access', {
      //   internalCode: '0006',
      // })
    }

    if (
      new Date().toISOString() > new Date(session!.expired_at).toISOString()
    ) {
      log.debug(`Invalid access: session expired`)
      // throw createError(401, 'Invalid access', {
      //   internalCode: '0011',
      // })
    }

    if (!session!.is_valid) {
      log.debug(`Invalid access: session not valid`)
      // throw createError(403, 'Invalid access', {
      //   internalCode: '0007',
      // })
    }

    const user = await prisma.users.findFirst({
      where: { id: session!.user_id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        is_blocked: true,
        is_deleted: true,
      },
    })

    if (!user) {
      log.debug(`Invalid access: user not found`)
      // throw createError(401, 'Invalid access', {
      //   internalCode: '0008',
      // })
    }

    await prisma.sessions.update({
      data: {
        last_active: new Date(),
        expired_at: dayjs().add(config.SESSION_TTL, 'seconds').toDate(),
      },
      where: {
        id: session!.id,
      },
    })

    req.user = user!
  }

  fastify.decorateRequest('user', null)
  fastify.addHook('onRequest', authenticate)
}

export default fp(authentication)
