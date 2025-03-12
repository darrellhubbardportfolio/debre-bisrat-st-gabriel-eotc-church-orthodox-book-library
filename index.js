require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const cookie = require("cookie-parser");

// read express static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

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

// load models
const { Books } = require("./models/BookModel");
const books = new Books(); // create a book instance

const { PDF } = require("./models/PDFModel");
const pdf = new PDF(); // create a pdf instance

// home page
app.get("/", (req, res) => {
    // res.send("home page. this is the library, first page users will see.");
    res.render("index");
}); // this is like the library.

// this route, use a fetch request to get all books
app.get("/api/library", 
    async (req, res) => {

    let book = await books.findBookRange(0, 8);
    res.json(book);
});

// use fetch request from client to find new ranges.
app.post("/api/find-book-range", 
    async (req, res) => {

    const { start, last } = req.body;
    
    let book = await books.findBookRange(start, last);
    res.json(book);
});

// book (find a specific book)
app.get("/book/:title", 
    async (req, res) => {
        const { title } = req.params;
        let book = await books.findBook(title);
        res.render("book", { book });
});

// church members upload pdf file 
app.get("/donate-a-book", (req, res) => {
    // res.send("pdf upload form. church members can upload a new pdf file.");
    res.render("book-donation-page");
})

// church members will upload a new file here for download.
app.post("/donate-a-book/post", (req, res) => {

    const { name, email } = req.body;
    const book = req.file;
    
    // save to database
    res.json({name: name, email: email});
});

// administrator can view all categories here

// administrator can view all pdf files here
app.get("/pdfs", (req, res) => {
    res.render("(admin)/pdf-database");
});

app.get("/api/pdfs", async (req, res) => {

    let items = await pdf.readPDF();
    res.json(items);
});

// administrator creates books on this route
app.get("/create-book", (req, res) => {
    res.render("(admin)/create-a-book");
});

// administrator can view all books here

// administrator can view all permissions here

// administrators can view all users here

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running or port " + port);
});