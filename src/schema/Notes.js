const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notesSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Note = model("Note", notesSchema);

module.exports = Note;
