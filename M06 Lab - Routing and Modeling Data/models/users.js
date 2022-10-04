const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
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

const Users = mongoose.model('users', userSchema);
module.exports = Users;