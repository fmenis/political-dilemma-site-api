import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { seedCategories, deleteCategories } from './categories'
import { seedArticles, deleteArticles } from './articles'

export async function seedDb() {
  try {
    await seedCategories(prisma)
    await seedArticles(prisma)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export async function resetDb() {
  try {
    await deleteArticles(prisma)
    await deleteCategories(prisma)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
