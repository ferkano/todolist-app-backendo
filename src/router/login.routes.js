const loginRouter = require("express").Router();
const User = require("../schema/User");
const bcrypt = require("bcrypt");

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
  res.send({
    name: user.name,
    username: user.username,
  });
});

module.exports = loginRouter;
