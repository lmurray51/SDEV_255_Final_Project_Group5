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
  subjectArea: {
    type: String,
    required: true
  },
  creditNum: {
    type: Number,
    required: true
  },
  courseUsers: {
    type: Array,
    required: true
  },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;