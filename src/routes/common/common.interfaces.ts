export interface IPaginatedParams {
  limit: number;
  offset: number;
}

export interface IListParams {
  pagination: IPaginatedParams;
}
