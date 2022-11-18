const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// Database book
const books = [
  {
    id: 1,
    isbn: "978-3-16-148410-0",
    title: "The Lord of the Rings",
    author: "J. R. R. Tolkien",
    publish_date: "1954-07-29",
    publisher: "Allen & Unwin",
    numOfPages: 1216,
  },
  {
    id: 2,
    isbn: "978-3-16-148410-1",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J. K. Rowling",
    publish_date: "1998-07-02",
    publisher: "Bloomsbury Publishing",
    numOfPages: 341,
  },
  {
    id: 3,
    isbn: "978-3-16-148410-2",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    publish_date: "1997-06-26",
    publisher: "Bloomsbury Publishing",
    numOfPages: 223,
  },
  {
    id: 4,
    isbn: "978-3-16-148410-3",
    title: "And Then There Were None",
    author: "Agatha Christie",
    publish_date: "1939-11-06",
    publisher: "The Bodley Head",
    numOfPages: 320,
  },
  {
    id: 5,
    isbn: "978-3-16-148410-4",
    title: "Dream of the Red Chamber",
    author: "Cao Xueqin",
    publish_date: "1754-10-24",
    publisher: "Guoxue Chubanshe",
    numOfPages: 1216,
  },
];

// Configuring body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/books", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    isbn: req.body.isbn,
  };
  books.push(book);
  res.send(book);
});

// GET all books
app.get("/books", (req, res) => {
  res.send(books);
});

// GET a book
app.get("/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send("The book with the given ID was not found.");
  res.send(book);
});

//  UPDATE a book
app.put("/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send("The book with the given ID was not found.");

  book.title = req.body.title;
  book.description = req.body.description;
  res.send(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send("The book with the given ID was not found.");

  const index = books.indexOf(book);
  books.splice(index, 1);

  res.send(book);
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
