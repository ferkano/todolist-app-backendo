module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(403).send({
      error: "user in use, try another.",
    });
  }
};
