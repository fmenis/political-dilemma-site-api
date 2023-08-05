// import { Static, Type } from '@sinclair/typebox'

// export const listArticlesQuerystring = Type.Object(
//   {
//     limit: Type.Integer({
//       maximum: 100,
//       default: 10,
//       description: 'Number of results (pagination).',
//     }),
//     offset: Type.Integer({
//       maximum: 100,
//       default: 0,
//       description: 'Items to skip (pagination).',
//     }),
//   },
//   { additionalProperties: false }
// )
// export type ListArticlesQuerystringType = Static<typeof listArticlesQuerystring>

// export const SlistArticles = Type.Object(
//   {
//     id: Type.String({ format: 'uuid', description: '##TODO' }),
//     title: Type.String({ minLength: 3, description: '##TODO' }),
//   },
//   { additionalProperties: false }
// )
// export type ListArticlesType = Static<typeof SlistArticles>
