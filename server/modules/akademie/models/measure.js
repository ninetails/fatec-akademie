var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measureSchema = new Schema({
  type_id: Number,
  value: Number,
  when: Date,
  created_by: Schema.Types.ObjectId,
  created_at: Date
});

var Measure = module.exports = mongoose.model("Measure", measureSchema);
