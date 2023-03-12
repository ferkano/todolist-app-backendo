const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { mongoose } = require("./database");
const handleError = require("./middleware/handleError");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}
console.log(process.env.MONGODB_URI);
const app = express();

app.set("port", process.env.PORT);
//configuracion inicial
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

console.log("hola", process.env.PORT);

//Controladores

app.use("/api/user", require("./router/user.routes"));
app.use("/api/login", require("./router/login.routes"));

//ultimos middlewares

app.use(handleError);

//levantando servidor
const server = app.listen(app.get("port"), () => {
  console.log(`servidor escuchando en el puerto ${app.get("port")}`);
});

module.exports = { app, server };
