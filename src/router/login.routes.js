const loginRouter = require("express").Router();
const User = require("../schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: "invalid user or password",
    });
  }

  //empesando a usar JWT
  //creando data al token
  const userForToken = {
    id: user._id,
    username: user.username,
  };

  //creando token con data y palabra secreta
  console.log(process.env.KEY_JWT);
  const token = jwt.sign(userForToken, process.env.KEY_JWT);

  res.send({
    name: user.name,
    username: user.username,
    lastname: user.lastname,
    id: user._id,
    token,
  });
});

module.exports = loginRouter;
