const express = require("express");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notesSchema = new Schema({
  title: String,
  description: String,
  date: Date,
});

notesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = model("note", notesSchema);

module.exports = Note;
