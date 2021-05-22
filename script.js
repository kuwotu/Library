// Write a constructor for making “Book” objects. We will revisit this in the project at the end of this lesson. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book

// Put a function into the constructor that can report the book info like so:

// theHobbit.info() // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"

const form = document.getElementById("AddBookForm");
const bookName = document.getElementById("bookName");
const authorName = document.getElementById("authorName");
const readOption = document.getElementById("readOption");
const addBookBtn = document.getElementById("addBookBtn");
const booksAddedContainer = document.getElementById("BooksAddedContainer");
const deleteBtn = document.getElementsByClassName("DeleteBtn");

let myLibrary = [];

function Book(title, author, readYet) {
  this.title = title;
  this.author = author;
  this.readYet = readYet;
}

// assigned the value inputs as variable so that they can be passed through the new Book object

function addBookToLibrary(e) {
  // preventDefault stops the page from reloading once the form is submitted

  e.preventDefault();
  let bookValue = bookName.value;
  let authorValue = authorName.value;
  let readValue = readOption.value;
  if (bookValue === "") {
    alert(`Please enter the name of the book`);
    return;
  } else if (authorValue === "") {
    alert(`Please enter the name of the author`);
    return;
  }
  const newBook = new Book(bookValue, authorValue, readValue);
  myLibrary.push(newBook);
  console.log(myLibrary);
  clearInput();

  // Write a function that loops through the array and displays each book on the page.
  clearBooksAdded();
  displayBooks();
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const div = document.createElement("div");
    div.classList.add("BooksAdded");
    div.setAttribute("data-number", `${i}`);

    const p1 = document.createElement("p");
    p1.textContent = myLibrary[i].title;

    const p2 = document.createElement("p");
    p2.textContent = myLibrary[i].author;

    const statusButton = document.createElement("button");
    statusButton.classList.add("ReadBtn");

    if (myLibrary[i].readYet === "Not Read") {
      statusButton.classList.add("NotReadBtn");
    }

    const editButton = document.createElement("button");
    editButton.classList.add("EditBtn");
    editButton.textContent = "Edit";

    const removeButton = document.createElement("button");
    removeButton.classList.add("RemoveBtn");

    removeButton.addEventListener();

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(statusButton);
    div.appendChild(editButton);
    div.appendChild(removeButton);
    booksAddedContainer.appendChild(div);
  }
}

// Add a button on each book’s display to remove the book from the library.
// You will need to associate your DOM elements with the actual book objects in some way.
// One easy solution is giving them a data-attribute that corresponds to the index of the library array.

// removes the previous dom elements so that the loop doesn't end up printing the same book multiple times
clearBooksAdded = () => {
  booksAddedContainer.innerHTML = "";
};

// clear function - used .value on Id's to change the dom element
clearInput = () => {
  bookName.value = "";
  authorName.value = "";
  // selectedIndex = 0 puts the select option back to the first option available
  readOption.selectedIndex = 0;
};

// Event Listeners

addBookBtn.addEventListener("click", addBookToLibrary);

addBookBtn.addEventListener("click", addBookToLibrary);
