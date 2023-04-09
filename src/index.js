const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { mongoose } = require("./database");
const handleError = require("./middleware/handleError");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}
const app = express();

const PORT = process.env.PORT || 3001;

app.set("port", PORT);
//configuracion inicial
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

Sentry.init({
  dsn: "https://a75d25229cdc4b3e9f30ca19bf043b0e@o4504820919304192.ingest.sentry.io/4504827918745600",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

//Controladores

app.use("/api/user", require("./router/user.routes"));
app.use("/api/login", require("./router/login.routes"));
app.use("/api/notes", require("./router/notes.routes"));
//usando sentry
app.use(Sentry.Handlers.errorHandler());

//ultimos middlewares

app.use(handleError);

//levantando servidor
const server = app.listen(app.get("port"), () => {
  console.log("server");
});

module.exports = { app, server };
