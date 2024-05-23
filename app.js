const express = require('express');

const app = express();

const morgan = require('morgan');

const mongoose = require('mongoose');

const Blog = require('./models/blog');

const dbURI = 'mongodb+srv://edgar123:TEST123@node-tuts.8wb3obi.mongodb.net/?retryWrites=true&w=majority&appName=node-tuts'

// Connect to the database and then allow the server to listen to requests
mongoose.connect(dbURI).then((result) => {
  app.listen(3000);
  console.log('connection success');
}).catch((err) => console.log(err));

app.set('view engine', 'ejs');

// Sample middleware
// app.use((req, res, next) => {
//   console.log(req.host);
//   console.log(req.path);
//   console.log(req.method);
//   console.log('Exiting middleware');
//   next();
// } );
//
// /

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

// mongodb routes

// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'this is a blog',
//     snippet: 'this is a peak of the BLOOGGG',
//     body: 'this is the bloggiest blog'});
//
//   blog.save(blog).then((result) => {
//     res.send(result)
//   }).catch((err) => {
//     console.log(err);
//   })
// });
//
// app.get('/all-blogs', (req, res) => {
//   Blog.find().then((result) => {
//     res.send(result);
//   }).catch((err) => console.log(err));
// });
//
// app.get('/single-blog', (req, res) => {
//   Blog.findById('66424d6ad9a53ed6e907dfdf').then((result) => {
//     res.send(result);
//   }).catch((err) => console.log(err));
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});
});

// Blog routes

app.get('/blogs', (req,res) => {
  Blog.find().sort({createdAt: -1})
  .then((result) => {
    res.render('index', {title: 'All Blogs', blogs: result});
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create'});
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id)
  .then(result => {
    res.render('details', {blog: result, title: 'Blog Details'});
  })
  .catch((err) => {
    res.render('404', {title: "Blog not found"});
  })

});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
  .then((result) => {
    res.redirect('/blogs');
  })
  .catch((err) => {
    console.log(err);
  });
});



app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});
