if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");

const app = express();
app.use(cors());
app.use(express.json());
const Message = require("./models/message");

connectDb();

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  if (res) {
    res.json({ messages: messages });
  } else {
    res.status(404).end();
  }
});

app.post("/addMessage", async (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const text = req.body.text;

  const message = await Message.create({
    user: user,
    title: title,
    text: text,
  });
  if (message) {
    res.json({ message: message });
  } else {
    res.status(404).end();
  }
});

app.put("/addMessage/:id", async (req, res) => {
  const messageId = req.params.id;
  const title = req.body.title;
  const text = req.body.text;
  await Message.findByIdAndUpdate(messageId, {
    title: title,
    text: text,
  });
  
  const message = await Message.findById(messageId);
  if (message) {
    res.json({ message: message });
  } else {
    res.status(404).end();
  }
});

app.listen(process.env.PORT);
