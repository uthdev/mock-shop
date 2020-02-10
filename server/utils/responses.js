export const successResponse = (res, statusCode, data) => res.status(statusCode).json({
  status: 'success',
  data,
});

export const errorResponse = (res, errorCode, errorMessage) => res.status(errorCode).json({
  status: 'error',
  error: errorMessage,
});
