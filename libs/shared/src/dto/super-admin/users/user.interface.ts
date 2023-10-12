export interface IPaginationDto {
  count?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  resultCount?: number;
  totalResult?: number;
}

export interface IUserListResponseDto {
  statusCode: number;
  message: string;
  data: object;
  pagination?: Partial<IPaginationDto>;
}

export interface IListResponseDto {
  statusCode: number;
  message: string;
  data: object;
  pagination?: Partial<IPaginationDto>;
}
