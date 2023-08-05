import Fastify, { FastifyInstance } from 'fastify'
import * as tap from 'tap'
import * as dotenv from 'dotenv'
dotenv.config({ path: 'test/.env' })

import app from '../../src/app'
import { seedDb, resetDb } from './seeding/main'

export type Test = (typeof tap)['Test']['prototype']

export async function build(t: Test): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      level: 'debug',
    },
  })

  await fastify.register(app)
  await fastify.ready()
  await seedDb()

  t.teardown(async () => {
    await resetDb()
    fastify.close()
  })

  return fastify
}
