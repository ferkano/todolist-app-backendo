const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

//conectando con mongodb atlas
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  "connectando a mongo atlas";
});

module.exports = mongoose;
