const notesRouter = require("express").Router();
const Notes = require("../schema/Notes");
const userExtractor = require("../middleware/userExtractor");
const User = require("../schema/User");

notesRouter.post("/", userExtractor, async (req, res, next) => {
  const { title, description } = req.body;

  const { userId } = req;

  const user = await User.findById(userId);

  const notes = new Notes({ title, description, user: user._id });
  const savedNote = await notes.save();

  user.notes = user.notes.concat(savedNote._id);

  await user.save();
  res.json(savedNote);
});

notesRouter.get("/", userExtractor, (req, res, next) => {
  Notes.find().then((note) => res.json(note));
});

notesRouter.get("/:id", userExtractor, async (req, res, next) => {
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

notesRouter.delete("/:id", userExtractor, (req, res) => {
  const id = req.params.id;
  Notes.findByIdAndDelete({ _id: id }).then(res.end());
});

notesRouter.put("/:id", userExtractor, (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  Notes.updateOne({ _id: id }, { $set: { title, description } })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

module.exports = notesRouter;
