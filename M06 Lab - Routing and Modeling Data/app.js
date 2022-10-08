const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/courses');
const User = require('./models/users');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://teacherAccount:teacherPassword@cluster0.bthfqmo.mongodb.net/SDEV255Group5?retryWrites=true&w=majority";

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
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { course: result, title: 'All Courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/index', (req, res) => {
  const course = new Course(req.body);

  course.save()
    .then(result => {
      res.redirect('/index');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/course/:id', (req, res) => {
  const id = req.params.id;
    Course.findById(id)
    .then((result) => {
        res.render('edit', {course: result, title: 'Course Page'});
    })
    .catch((err) => {
        console.log(err);
        res.status(404).render('404', { title: "404"});
    });
});

// Got this working for viewing users!!!!
app.get('/all-users', (req, res) => {
  User.find()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
});

// Delete page
app.get('/delete', (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('delete', { course: result, title: 'All Courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/details/:id', (req, res) => {
  const id = req.params.id;
    Course.findById(id)
    .then((result) => {
        res.render('details', {course: result, title: 'Delete Confirmation Page'});
    })
    .catch((err) => {
        console.log(err);
        res.status(404).render('404', { title: "404"});
    });
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  
  Course.findByIdAndDelete(id)
    .then(result => {
      res.redirect('/index');
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});