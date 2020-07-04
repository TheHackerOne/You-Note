const express = require('express');
const router = express.Router();

const Topic = require("../model/topic");
const Note = require("../model/note");
const saveTopic = (topic, res) => {
  topic
    .save()
    .then(topic => { res.json(topic); })
    .catch(() => res.json({msg: "Error: Could Note Save Note."}));
}

const COULD_NOT_FIND = {
  msg: "Could Not Find Topic With That ID."
};

const TOPIC_DELETED = {
  msg: "Topic Successfully Deleted"
};

router.get("/:id", (req, res) => {
  Topic.findById(req.params.id)
    .then(topic => res.json(topic))
    .catch(() => res.json(COULD_NOT_FIND));
});

router.post("/", (req, res) => {
  const { title, videoLink } = req.body;
  let topic = new Topic({title, videoLink})
  saveTopic(topic, res);
});


router.put("/:id", (req, res) => {
  console.log(req.params);
  const { title, videoLink } = req.body;
  Topic.findById(req.params.id)
    .then(topic => {
      topic.title = title;
      topic.videoLink = videoLink;
      saveTopic(topic, res);
    })
    .catch(() => res.json(COULD_NOT_FIND))
});

router.put("/:id/add_note", (req, res) => {
  const { note } = req.body;
  let id = req.params.id;
  console.log(id);
  console.log(note);
  let newNote = new Note({
    ...note
  });
  newNote
    .save()
    .then(n => {
      Topic
        .findById(id)
        .then(topic => {
          topic.notes.push(n._id);
          topic
            .save()
            .then(topic => res.json(topic))
            .catch(() => res.json({msg: "COULD NOT SAVE NEW NOTE."}));
        })
        .catch(() => res.json(COULD_NOT_FIND))
    }).catch(() => res.json({msg: "ERROR SAVING NOTE."}));
});

router.delete("/:id", (req, res) => {
  Topic
    .findByIdAndDelete(req.params.id)
    .then(() => res.json(TOPIC_DELETED))
    .catch(() => res.json(COULD_NOT_FIND));
});

module.exports = router;