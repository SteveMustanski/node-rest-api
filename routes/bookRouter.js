const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();
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
  bookRouter.use('/books/:dbBookId', (req, res, next) => {
    //get the db book id from the url and pass it to the find
    Book.findById(req.params.dbBookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route('/books/:dbBookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.bookId = null;
      book.save();
      return res.json(book);
    });
  return bookRouter;
}

module.exports = routes;
