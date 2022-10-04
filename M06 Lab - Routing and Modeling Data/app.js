const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Courses = require('./models/courses');
const Users = require('./models/users');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://teacherAccount:teacherPassword@cluster0.bthfqmo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view enginec
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// website routes
// default page
app.get('/', (req, res) => {
  res.redirect('/index');
});

// Add page
app.get('/add', (req, res) => {
  res.render('add', { title: 'Add a new course' });
});

// Home/index page
app.get('/index', (req, res) => {
  Courses.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { courses: result, title: 'All Courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

// Delete page
app.get('/delete', (req, res) => {
  const id = req.params.id;
  Courses.findById(id)
    .then(result => {
      res.render('delete', { courses: result, title: 'Delete Course' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.post('/index', (req, res) => {
  // console.log(req.body);
  const blog = new Courses(req.body);

  blog.save()
    .then(result => {
      res.redirect('/index');
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/index/:id', (req, res) => {
  const id = req.params.id;
  
  Courses.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/index' });
    })
    .catch(err => {
      console.log(err);
    });
});

