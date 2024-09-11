module.exports = (error, req, res, next) => {
  console.error(error);

  res.status(418).json({
    success: false,
    message: error.message,
  });
};
