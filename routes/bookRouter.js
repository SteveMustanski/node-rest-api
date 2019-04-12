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
  bookRouter.route('/books/:dbBookId').get((req, res) => {
    //get the db book id from the url and pass it to the find
    Book.findById(req.params.dbBookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });
  return bookRouter;
}

module.exports = routes;
