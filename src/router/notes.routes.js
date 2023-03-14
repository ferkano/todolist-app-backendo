const notesRouter = require("express").Router();
const Notes = require("../schema/Notes");

notesRouter.post("/", (req, res, next) => {
  const { title, description } = req.body;

  const notes = new Notes({ title, description });

  notes
    .save()
    .then((note) => {
      res.status(202).json(note);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
