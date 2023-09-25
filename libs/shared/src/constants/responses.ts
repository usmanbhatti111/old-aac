export const errorResponse = (
  statusCode: number = 500,
  message: string = 'Internal Server Error',
  error: any = []
) => {
  return {
    statusCode,
    message,
    error,
    data: null,
  };
};

export const successResponse = (
  statusCode: number = 200,
  message: string = 'Success',
  data: object = {},
  pagination?: {
    count: number;
    page: number;
    limit: number;
  }
) => {
  if (pagination) {
    const { count, page, limit } = pagination;
    return {
      statusCode,
      message,
      data,
      count: count,
      pagination:
        Array.isArray(data) && count && limit
          ? {
              page,
              limit,
              totalPages: Math.ceil(count / limit),
              resultCount: data.length,
              totalResult: count,
            }
          : null,
      error: null,
    };
  } else {
    return {
      statusCode,
      message,
      data,
      error: null,
    };
  }
};
