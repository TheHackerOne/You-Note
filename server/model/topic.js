var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title:  String, 
  videoLink:   String,
  notes: [{type: Schema.Types.ObjectId, ref: "Note"}],
  date: { type: Date, default: Date.now },
}, {
  timestamps: true
});

module.exports = Note = mongoose.model('Topic', NoteSchema);