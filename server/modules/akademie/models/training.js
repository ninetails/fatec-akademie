var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainingSchema = new Schema({
  id: Number,
  name: { type: String, required: true, trim: true },
  training_type: Number,
  objective: Schema.Types.Mixed,
  created_by: Schema.Types.ObjectId,
  created_at: { type: Date },
  until: { type: Date }
});

var Training = module.exports = mongoose.model("Training", trainingSchema);
