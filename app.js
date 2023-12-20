const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const express = require("express");
const logger = require("morgan");
const stylus = require("stylus");
const path = require("path");
const app = express();

require("dotenv").config();

const api = require("./routes/api");
const admin = require("./routes/admin");
const index = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public_admin
app.use(favicon(path.join(__dirname, "public_admin", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(stylus.middleware(path.join(__dirname, "public_admin")));
app.use(express.static(path.join(__dirname, "public_admin"), {maxAge : 86400000}));
app.use(express.static(path.join(__dirname, "public"), {maxAge : 86400000}));

app.use("/api", api);
app.use("/admin", admin);
app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
