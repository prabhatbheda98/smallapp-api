module.exports = async (err, req, res, next) => {
    if (!err) return next();
    const errorResponse = Object.assign(
      { stack: err.stack },
      err.output && err.output.payload ? err.output.payload : err
    );
    const statusCode = err.output && err.output.statusCode ? err.output.statusCode : err;
    return res.status(statusCode).json(errorResponse);
  };