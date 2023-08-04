import { Static, Type } from '@sinclair/typebox'

export const noContentSchema = Type.Null({
  $id: 'sNoContent',
  description: 'No Content.',
})
export type NoContentType = Static<typeof noContentSchema>

export const acceptedSchema = Type.Null({
  $id: 'sAccepted',
  description: 'Accepted.',
})
export type AcceptedType = Static<typeof acceptedSchema>

export const paginatedResultsSchema = Type.Object(
  {
    totalItems: Type.Integer({
      description: 'Total results.',
    }),
    itemsPerPage: Type.Integer({
      description: 'Total results per page.',
    }),
    pageCount: Type.Integer({
      description: 'Total pages.',
    }),
    page: Type.Integer({
      description: 'Current page index.',
    }),
    lastPage: Type.Boolean({
      description: 'Defines if the current is the last available page.',
    }),
  },
  {
    additionalProperties: false,
    $id: 'sPaginatedInfo',
    description: 'Paginated results.',
  }
)
export type PaginatedResultsType = Static<typeof paginatedResultsSchema>

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
      {
        validation: Type.Array(
          Type.Object({
            message: Type.String({
              description: 'Validation message.',
            }),
          })
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      }
    ),
  },
  {
    additionalProperties: false,
    $id: 'sNotFound',
    description: 'Not found.',
  }
)
export type NotFoundType = Static<typeof notFoundSchema>

export const badRequestSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 400,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Bad Request.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Array(
          Type.Object({
            message: Type.String({
              description: 'Validation message.',
            }),
          })
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      }
    ),
  },
  {
    additionalProperties: false,
    $id: 'sBadRequest',
    description: 'Bad request.',
  }
)
export type BadRequestType = Static<typeof badRequestSchema>

export const unauthorizedSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 401,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Unauthorized.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Array(
          Type.Object({
            message: Type.String({
              description: 'Validation message.',
            }),
          })
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      }
    ),
  },
  {
    additionalProperties: false,
    $id: 'sUnauthorized',
    description: 'Unauthorized.',
  }
)
export type UnauthorizedType = Static<typeof unauthorizedSchema>

export const forbiddenSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 403,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Forbidden.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Array(
          Type.Object({
            message: Type.String({
              description: 'Validation message.',
            }),
          })
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      }
    ),
  },
  {
    additionalProperties: false,
    $id: 'sForbidden',
    description: 'Forbidden.',
  }
)
export type ForbiddenType = Static<typeof forbiddenSchema>

export const conflictSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 409,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Conflict.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
    details: Type.Object(
      {
        validation: Type.Array(
          Type.Object({
            message: Type.String({
              description: 'Validation message.',
            }),
          })
        ),
      },
      {
        additionalProperties: true,
        description: 'Error details (unstructured data).',
      }
    ),
  },
  {
    additionalProperties: false,
    $id: 'sConflict',
    description: 'Conflict.',
  }
)
export type ConflictType = Static<typeof conflictSchema>

export const internalServerErrorSchema = Type.Object(
  {
    statusCode: Type.Integer({
      default: 500,
      description: 'Http status code.',
    }),
    error: Type.String({
      default: 'Internal Server Error.',
      description: 'Http error.',
    }),
    message: Type.String({
      description: 'Message.',
    }),
    internalCode: Type.String({
      description: 'Internal code.',
    }),
  },
  {
    additionalProperties: false,
    $id: 'sInternalServerError',
    description: 'Internal Server Error.',
  }
)
export type InternalServerErrorType = Static<typeof internalServerErrorSchema>
