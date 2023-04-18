import { Static, Type } from '@sinclair/typebox'

//##TODO aggiungere tutti gli altri

export const notFoundSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 404,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Not found.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {},
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      }
    ),
  },
  {
    additionalProperties: false,
    $id: 'notFoundSchema',
    description: 'Not found.',
  }
)
export type NotFoundType = Static<typeof notFoundSchema>
