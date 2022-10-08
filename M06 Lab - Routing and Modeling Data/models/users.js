const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true
  },
  isTeacher: {
    type: Boolean,
    required: true
  },
  course_ID: {
    type: Array,
    required: false
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;