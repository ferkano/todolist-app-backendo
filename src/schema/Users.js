const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  lastname: String,
  passwordHash: String,
});
console.log("hola");
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;

    delete returnedObject._id;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

const User = model("User", userSchema);

module.exports = User;
