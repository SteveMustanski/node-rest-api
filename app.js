const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect('mongodb://localhost/bookAPI', {
  useNewUrlParser: true,
});
const bookRouter = express.Router();
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter
  .route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    book.save();
    res.status(201).json(book);
  })
  .get((req, res) => {
    //get the query from the url and pass it to the find
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
bookRouter.route('/books/:dbBookId').get((req, res) => {
  //get the db book id from the url and pass it to the find
  Book.findById(req.params.dbBookId, (err, book) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API!!!');
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
