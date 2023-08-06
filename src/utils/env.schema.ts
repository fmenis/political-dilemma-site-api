import { ENV } from '../common/enum'

import { Static, Type } from '@sinclair/typebox'

function StringEnum<T extends string[]>(values: [...T]) {
  return Type.Unsafe<T[number]>({ type: 'string', enum: values })
}

export const configSchema = Type.Object(
  {
    NODE_ENV: StringEnum([
      ENV.LOCAL,
      ENV.TEST,
      ENV.DEVELOPMENT,
      ENV.STAGING,
      ENV.PRODUCTION,
    ]),
    SERVER_ADDRESS: Type.String({ default: '127.0.0.1' }),
    SERVER_PORT: Type.Number({ default: 3000 }),
    LOG_LEVEL: StringEnum(['info', 'debug']),
    SECRET: Type.String(),
    SESSION_TTL: Type.Number(),
    ENABLE_BODY_LOG: Type.Boolean({ default: false }),
  },
  { additionalProperties: false }
)
export type ConfigSchemaType = Static<typeof configSchema>
