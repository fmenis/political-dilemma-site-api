import { test } from 'tap'
import { build } from '../../helpers/helper'

test('List article API', async t => {
  t.plan(2)

  const fastify = await build(t)

  const res = await fastify.inject({
    method: 'GET',
    path: 'api/public/v1/articles',
  })

  const articles = res.json()

  t.equal(res.statusCode, 200)
  t.equal(articles.length, 5)
})
