export const globalErrorHandler = (err, req, res, next) => {
  console.log('Error', err);

  //Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong on the server';

  //Handle specific Mongoose errors
  if (err.name === 'validationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue).join(', ');
    message = `Duplicate value for field(s): ${field}`;
  }

  res.status(statusCode).json({
    success: false,
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
    message: message,
  });
};
