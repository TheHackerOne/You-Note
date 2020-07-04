const express = require('express');
const router = express.Router();

const Note = require("../model/note");

const saveNote = (note, res) => {
  note
    .save()
    .then(note => res.json(note))
    .catch(() => res.json({msg: "Error: Could Note Save Note."}));
}

const COULD_NOT_FIND = {
  msg: "fail"
};

const NOTE_DELETED = {
  msg: "success"
};

router.get("/", (req, res) => {
  Note.find({author: req.username.username}).then(notes => {
    res.json(notes);
  })
})

router.post("/", (req, res) => {
  const { title, body, videoLink } = req.body;
  let note = new Note({
    title: title, 
    body: JSON.parse(body),
    author: req.username.username,
    videoLink: videoLink
  });
  saveNote(note, res);
});

router.put("/:id", (req, res) => {
  const { title, body, videoLink } = req.body;
  Note.findById(req.params.id)
    .then(note => {
      note.title = title
      note.body = JSON.parse(body);
      note.videoLink = videoLink;
      saveNote(note, res);
    })
    .catch(() => res.json(COULD_NOT_FIND))
});

router.delete("/:id", (req, res) => {
  Note
    .findByIdAndDelete(req.params.id)
    .then(() => res.json(NOTE_DELETED))
    .catch(() => res.json(COULD_NOT_FIND));
});

module.exports = router;