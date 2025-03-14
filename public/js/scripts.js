
document.addEventListener("DOMContentLoaded", () => {
    const bookCatalog = document.querySelector(".books");
    // sort
    let sortBtn = document.querySelector("#sort");
    let displaysPerPage = document.querySelector("select[name='displays_per_page']");
    let start = 0;
    let last = displaysPerPage.value;

    findBookRange(start, last);

    displaysPerPage.addEventListener("change", () => {
        
        // update the last var
        last = displaysPerPage.value;

        // check results
        console.log("start:" + start + " last: " + last);

        findBookRange(start, last);
    });

    // update book range
    async function findBookRange(start, last) {

        // clear the list of books first
        bookCatalog.innerHTML = null;

        const options = {
            method: "POST",
            body: JSON.stringify({start, last}),
            headers: {
                "Content-Type" : "application/json" 
            }
        }
        // now search for a new range
        const request = await fetch("/api/find-book-range", options);

        const books = await request.json();

        // clear the list of books first
        bookCatalog.innerHTML = null;

        books.map(book => {
            createBook(book);
        });
    }

    // search for book
    function searchForBook (search) {

    }

    sortBtn.addEventListener("change", () => {

        let key = sortBtn.getAttribute("value");

        let order = sortBtn.getAttribute("data-sort-order");

        // check results
        console.log("Key: " + key);
        console.log("Order: " + order);
        // sortBookItems({ key: key, order: order });
    });

    async function sortBookItems (sort) {

        const { key, order } = sort;
        // check results
        console.log(sort);
        console.log(key);
        console.log(order);
        // const request = await fetch("/api/books/sort/key/" + key + "/order/" + order);
        // const results = await request.json();
        // console.log(results);
    }

    // create a new book
    function createBook(data) {

        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");

        const book = document.createElement("article");
        book.classList.add("book");

        const bookLink = document.createElement("a");
        bookLink.classList.add("book-link");
        bookLink.href = "/book/" + data.title;

        const bookCoverContainer = document.createElement("div");
        bookCoverContainer.classList.add("book-cover-container");

        const bookCover = document.createElement("img");
        bookCover.classList.add("book-cover");
        bookCover.src = data.cover;
        bookCover.alt = data.title;

        const bookGenre = document.createElement("span");
        bookGenre.classList.add("book-genre");
        bookGenre.innerHTML = data.genre;

        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");

        const title = document.createElement("h5");
        title.classList.add("book-title");
        title.textContent = data.title;

        const author = document.createElement("p");
        author.classList.add("book-author");
        author.textContent = data.author;

        const description = document.createElement("p");
        description.classList.add("book-description");
        description.textContent = data.description;

        // add the book link 1st
        book.appendChild(bookLink);

        // add the book cover to the booklink
        bookLink.appendChild(bookCoverContainer);

        // add teh book info to the link
        bookLink.appendChild(bookInfo);
        
        bookCoverContainer.appendChild(bookCover);
        bookCoverContainer.appendChild(bookGenre);

        // add the book info
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(description);


    bookContainer.appendChild(book);
    bookCatalog.appendChild(bookContainer);

        // check results
        console.log("new book created");
    }
    // count the total number of books in results
    const searchResults = document.querySelector(".search-results-count");
});
