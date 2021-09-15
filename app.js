const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const app = express();
const { usersRouter, contactsRouter } = require("./routes/api");

/* const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
  to: "tarkravch@gmail.com",
  from: "taras-kravchuk@i.ua",
  subject: "Регистрация на сайте",
  html: "<p>Поздравляем с успешной регистрацией на нашем сайте</p>",
};

sgMail
  .send(mail)
  .then(() => console.log("Email success sent"))
  .catch((error) => console.log(error.message)); */

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
