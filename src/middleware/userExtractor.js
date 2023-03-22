require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Recuperando token en la cabezar (metodo de express)
  const authorization = req.get("authorization");
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  //decodificar token
  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, process.env.KEY_JWT);
  } catch (error) {}

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const { id: userId } = decodedToken;

  req.userId = userId;
  //NOS VAMOS PARA LA RUTA POST DE TASK
  next();
};
