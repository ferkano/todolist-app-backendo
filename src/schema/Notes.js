const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notesSchema = new Schema({
  title: String,
  date: Date,
  status: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Note = model("Note", notesSchema);

module.exports = Note;
