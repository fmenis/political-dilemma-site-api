import { FastifyError } from 'fastify'

export interface IPaginatedParams {
  limit: number
  offset: number
}

export interface IListParams {
  pagination: IPaginatedParams
}

export interface IClientHttpError extends FastifyError {
  internalCode: string
  details: any
}
