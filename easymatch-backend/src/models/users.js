const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  birthdate: {
    type: Date,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  sports: [{
    type: String,
    lowercase: true,
  }],

  events: [{
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = model('User', userSchema);
