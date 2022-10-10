const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;