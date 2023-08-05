import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { CATEGORY_TYPES, ARTICLE_STATES } from '../../../src/common/enum'

export async function seedArticles(prisma: PrismaClient): Promise<void> {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
    },
    where: {
      type: CATEGORY_TYPES.ARTICLE,
    },
  })

  await prisma.articles.createMany({
    data: [
      {
        id: faker.datatype.uuid(),
        title: faker.random.words(5),
        status: faker.helpers.objectValue(ARTICLE_STATES),
        categoryId: categories[0].id,
        cancellationReason: faker.helpers.maybe(() => faker.random.words(10)),
        text: faker.helpers.maybe(() => faker.lorem.text()),
      },
      {
        id: faker.datatype.uuid(),
        title: faker.random.words(5),
        status: faker.helpers.objectValue(ARTICLE_STATES),
        categoryId: categories[0].id,
        cancellationReason: faker.helpers.maybe(() => faker.random.words(10)),
        text: faker.helpers.maybe(() => faker.lorem.text()),
      },
      {
        id: faker.datatype.uuid(),
        title: faker.random.words(5),
        status: faker.helpers.objectValue(ARTICLE_STATES),
        categoryId: categories[0].id,
        cancellationReason: faker.helpers.maybe(() => faker.random.words(10)),
        text: faker.helpers.maybe(() => faker.lorem.text()),
      },
      {
        id: faker.datatype.uuid(),
        title: faker.random.words(5),
        status: faker.helpers.objectValue(ARTICLE_STATES),
        categoryId: categories[0].id,
        cancellationReason: faker.helpers.maybe(() => faker.random.words(10)),
        text: faker.helpers.maybe(() => faker.lorem.text()),
      },
      {
        id: faker.datatype.uuid(),
        title: faker.random.words(5),
        status: faker.helpers.objectValue(ARTICLE_STATES),
        categoryId: categories[0].id,
        cancellationReason: faker.helpers.maybe(() => faker.random.words(10)),
        text: faker.helpers.maybe(() => faker.lorem.text()),
      },
    ],
  })
}

export async function deleteArticles(prisma: PrismaClient): Promise<void> {
  await prisma.articles.deleteMany()
}
