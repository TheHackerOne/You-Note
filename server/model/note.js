var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title:  { type: String }, 
  body:   { type: Object },
  author: { type: String },
  videoLink: { type: String },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true
});

module.exports = Note = mongoose.model('Note', NoteSchema);