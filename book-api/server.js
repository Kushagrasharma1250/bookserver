const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book collection
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Clean Code", author: "Robert C. Martin" }
];
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Book API! Use /books to view the collection.");
});
// ✅ READ all books
app.get("/books", (req, res) => {
  res.json(books);
});

// ✅ READ single book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// ✅ CREATE new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// ✅ UPDATE book by ID
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// ✅ DELETE book by ID
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.json(deletedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`📚 Book API running at http://localhost:${PORT}`);
});