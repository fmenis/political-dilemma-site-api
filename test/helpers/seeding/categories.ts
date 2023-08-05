import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { CATEGORY_TYPES } from '../../../src/common/enum'

export async function seedCategories(prisma: PrismaClient): Promise<void> {
  const data: any = []

  for (let i = 0; i < 20; i++) {
    data.push({
      name: faker.random.word(),
      type: faker.helpers.objectValue(CATEGORY_TYPES),
    })
  }

  await prisma.categories.createMany({
    data,
  })
}

export async function deleteCategories(prisma: PrismaClient): Promise<void> {
  await prisma.categories.deleteMany()
}
