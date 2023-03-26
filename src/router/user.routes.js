const router = require("express").Router();
const User = require("../schema/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  const { username, name, lastname, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, lastname, passwordHash });

  user
    .save()
    .then((user) => res.status(202).json(user))
    .catch((err) => {
      next(err);
    });
});

router.get("/", (req, res) => {
  User.find({})
    .populate("notes")
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  User.find({})
    .populate("notes")
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .populate("notes")
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
