const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  console.log("NOT FOUND : Original URL"+req.originalUrl);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
                                StatusCode: statusCode, 
                                Status : "Error" , 
                                Result: "", 
                                ErrorMessage: process.env.NODE_ENV === "production" ? null : err.stack,
                              });
};

module.exports = { notFound, errorHandler };
