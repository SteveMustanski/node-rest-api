const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
if (process.env.ENV === 'Test') {
  console.log('Running in test mode');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test', {
    useNewUrlParser: true,
  });
} else {
  console.log('This is not a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_prod', {
    useNewUrlParser: true,
  });
}
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API!!!');
});

app.server = app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

module.exports = app;
