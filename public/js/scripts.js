
const bookCatalog = document.querySelector(".books");

// fetch all books
fetch("/api/books")
.then(request => request.json())
.then(books => {
    books.forEach( book => {
        // check results
        console.log(book);
        createBook(book);
    });
});

// create a new book
function createBook(data) {

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    const book = document.createElement("article");
    book.classList.add("book");

    const bookLink = document.createElement("a");
    bookLink.classList.add("book-link");
    bookLink.href = "";

    const bookCoverContainer = document.createElement("div");
    bookCoverContainer.classList.add("book-cover-container");

    const bookCover = document.createElement("img");
    bookCover.classList.add("book-cover");
    bookCover.src = data.cover;
    bookCover.alt = data.title;

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    const title = document.createElement("h3");
    title.classList.add("book-title");
    title.textContent = data.title;

    const author = document.createElement("p");
    author.classList.add("book-author");
    author.textContent = data.author;

    const description = document.createElement("p");
    description.classList.add("book-description");
    description.textContent = data.description;

    // the button
    const bookButtons = document.createElement("div");
    bookButtons.classList.add("book-buttons");
    const bookButton = document.createElement("button");
    bookButton.classList.add("book-button");
    const bookButtonText = document.createElement("span");
    bookButtonText.classList.add("book-button-text");
    bookButtonText.textContent = "Start Reading";
    const bookButtonIcon = document.createElement("i");
    bookButtonIcon.classList.add("book-button-icon", "bi", "bi-arrow-up-right");

    // add the book link 1st
    book.appendChild(bookLink);

    // add the book cover to the booklink
    bookLink.appendChild(bookCoverContainer);

    // add teh book info to the link
    bookLink.appendChild(bookInfo);

    bookCoverContainer.appendChild(bookCover);

    // add the book info
    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(description);
    // bookInfo.appendChild(bookButtons);

    // add the buttons
    // bookButtons.appendChild(bookButton);
    // bookButton.appendChild(bookButtonText);
    // bookButton.appendChild(bookButtonIcon);


    bookContainer.appendChild(book);
    bookCatalog.appendChild(bookContainer);

    // check results
    console.log("new book created");
}

/*
    <div class="book-container">

        <article class="book">

            <a class="book-link">

                <div class="book-cover-container">
                    <img src="assets/the-sun-also-rises.jpg" alt="Book Cover" class="book-cover" />
                </div>
                <div class="book-info">

                    <h3 class="book-title">The Sun Also Rises</h3>
                    <p class="book-author">Earnest Hemingway</p>
                    <p class="book-description text-truncate col-12">a story of love and loss in post-war europe</p>
                    <div class="book-button-container">

                        <button type="button" class="book-button">
                            <span class="book-button-text">Start Reading</span>
                            <i class="bi bi-arrow-up-right book-button-icon"></i>
                        </button>
                    </div>
                </div>
            </a>
        </article>
    </div>
    <!-- created first book -->
*/

// count the total number of books in results
const searchResults = document.querySelector(".search-results-count");
