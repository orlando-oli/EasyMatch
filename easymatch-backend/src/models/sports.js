const {Schema, model} = require('mongoose');

const sportSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  group: {
    type: Boolean,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
});

module.exports = model('Sport', sportSchema);
