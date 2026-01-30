export const errorHandler = (res, error, statusCode = 500) => {
  console.error('Error:', error.message || error);
  return res.status(statusCode).json({
    success: false,
    message: error.message || 'An unexpected error occurred',
  });
};
