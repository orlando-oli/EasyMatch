const {Schema, model} = require('mongoose');

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
  },
  seats: {
    type: Number,
    min: 1,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: false,
  },
  key: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  users: [{
    type: String,
  }],
});

module.exports = model('Event', eventSchema);
