const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/courses');
const User = require('./models/users');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

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
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// website routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('login'));
app.use(authRoutes);

// Add page
app.get('/add', requireAuth, (req, res) => {
  res.render('add', { title: 'Add a new course' });
});

// Home/index page
app.get('/index', requireAuth, (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { course: result, title: 'All Courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/index', requireAuth, (req, res) => {
  const course = new Course(req.body);

  course.save()
    .then(result => {
      res.redirect('/index');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/course/:id', requireAuth, (req, res) => {
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

// Edit Page
app.get('/edit', requireAuth, (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('edit', { course: result, title: 'All Courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/editDetails/:id', requireAuth, (req, res) => {
  const id = req.params.id;
    Course.findById(id)
    .then((result) => {
        res.render('editDetails', {course: result, title: 'Edit Details'});
    })
    .catch((err) => {
        console.log(err);
        res.status(404).render('404', { title: "404"});
    });
});

app.post('/edit/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  Course.findByIdAndUpdate(id, req.body)
    .then(result => {
      res.redirect('/index');
    })
    .catch(err => {
      console.log(err);
    });
});

// Delete page
app.get('/delete', requireAuth, (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('delete', { course: result, title: 'All Courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/details/:id', requireAuth, (req, res) => {
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

app.get('/delete/:id', requireAuth, (req, res) => {
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