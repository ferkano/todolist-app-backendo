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

notesRouter.get("/", (req, res, next) => {
  Notes.find().then((note) => res.json(note));
});

notesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  Notes.findById({ _id: id })
    .then((notes) => {
      if (notes) {
        res.json(notes);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
});

notesRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Notes.findByIdAndDelete({ _id: id }).then(res.end());
});

notesRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  Notes.updateOne({ _id: id }, { $set: { title, description } })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

module.exports = notesRouter;
