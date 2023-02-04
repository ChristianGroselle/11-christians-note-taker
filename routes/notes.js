const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const db = require("../db/db.json");

//api routes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request received to submit a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json(`Error when creating note`);
  }
});

notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  const { id } = req.params;
  readAndDelete(id, "./db/db.json");
  res.json("success");
});
module.exports = notes;
