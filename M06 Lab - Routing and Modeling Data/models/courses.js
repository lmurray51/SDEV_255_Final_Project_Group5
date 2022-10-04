const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseNum: {
    type: Number,
    required: true
  },
  courseDesc: {
    type: String,
    required: true
  },
});

const Courses = mongoose.model('courses', courseSchema);
module.exports = Courses;