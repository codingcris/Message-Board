const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const MESSAGES = [
  {
    text: "Hi there!",
    user: "Cristian Reyes",
    added: new Date(),
    id: 0,
  },
  {
    text: "Hello World!",
    user: "Cristian Reyes",
    added: new Date(),
    id: 1,
  },
];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { messages: MESSAGES });
});

app.get("/new", (req, res) => {
  res.render("newMessage");
});

app.post("/new", (req, res) => {
  const msg = req.body;
  MESSAGES.push({
    text: msg.messageTxt,
    user: msg.user,
    added: new Date(),
    id: MESSAGES.length,
  });
  res.redirect("/");
});

app.get("/message/:messageId", (req, res) => {
  let msg = MESSAGES.find((m) => m.id === Number(req.params.messageId));

  if (msg) {
    res.render("messageDetails", { message: msg });
    return;
  }

  res.status(404).send("Message Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("ERROR");
});

const PORT = 8080;
app.listen(PORT, "localhost", () => {
  console.log("APP listening at localhost/" + `${PORT}`);
});
