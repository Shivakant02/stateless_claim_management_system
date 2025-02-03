const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
  
    console.log('Error Details:', error);
  
    res.status(statusCode).json({
      success: false,
      message: message,
      stack: error.stack,
    });
  };
  
  export default errorMiddleware;
  