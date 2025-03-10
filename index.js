require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const cookie = require("cookie-parser");

// read express static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/books.json", express.static(path.join(__dirname, "books.json")));

// read body form data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set view engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// create session data
app.use(cookie());
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));

// home page
app.get("/", (req, res) => {
    // res.send("home page. this is the library, first page users will see.");
    res.render("index");
}); // this is like the library.

// book
app.get("/book", (req, res) => {
    res.send("book page. view a particular book");
});

// read a book
app.get("/book/book", (req, res) => {
    res.send("read book on this page.");
});

const { Books } = require("./models/models");
// this route, use a fetch request to get all books
app.get("/api/books", 
    async (req, res) => {

    const Book = new Books();
    let book = await Book.read();
    res.json(book);
});

// church members upload pdf file 
app.get("/pdf-upload-request", (req, res) => {
    // res.send("pdf upload form. church members can upload a new pdf file.");
    res.render("request-pdf-upload");
})

// church members will upload a new file here for download.
app.post("/pdf-upload-request/post", (req, res) => {
    res.send("you have donated a new book to the library.");
});

// administrator can view all categories here

// administrator can view all pdf files here

// administrator can view all books here

// administrator can view all permissions here

// administrators can view all users here

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running or port " + port);
});