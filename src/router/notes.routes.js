const notesRouter = require("express").Router();
const Notes = require("../schema/Notes");
const userExtractor = require("../middleware/userExtractor");
const User = require("../schema/User");

notesRouter.post("/", userExtractor, async (req, res, next) => {
  const { title } = req.body;

  const { userId } = req;

  const user = await User.findById(userId);

  const notes = new Notes({ title, user: user._id, status: true });
  const savedNote = await notes.save();

  user.notes = user.notes.concat(savedNote._id);

  await user.save();
  res.json(savedNote);
});

notesRouter.put("/:id", userExtractor, (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  if (title !== undefined) {
    Notes.updateOne({ _id: id }, { $set: { title } })
      .then((resp) => res.json({ title, id }))
      .catch((err) => res.json(err));
  }
  Notes.updateOne({ _id: id }, { $set: { status: status } })
    .then((resp) => res.json({ id, status, title }))
    .catch((err) => res.json(err));
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
  Notes.findByIdAndDelete({ _id: id }).then((resp) =>
    res.status(200).json({
      statusCode: 200,
      status: "Element is removed",
    })
  );
});

module.exports = notesRouter;
