// QuerySelectors

const form = document.getElementById("AddBookForm");
const bookName = document.getElementById("bookName");
const authorName = document.getElementById("authorName");
const readOption = document.getElementById("readOption");
const addBookBtn = document.getElementById("addBookBtn");
const booksRead = document.getElementById("booksRead");
const booksNotRead = document.getElementById("booksNotRead");
const booksAddedContainer = document.getElementById("BooksAddedContainer");
const booksAdded = document.getElementsByClassName("BooksAdded");
const deleteBtn = document.getElementsByClassName("DeleteBtn");
const readBtn = document.getElementsByClassName("ReadBtn");
const notReadBtn = document.getElementsByClassName("NotReadBtn");
const editBtn = document.getElementsByClassName("EditBtn");
const booksAddedDiv = document.getElementsByClassName("BooksAdded");

const readStatus = document.querySelectorAll("[changeStatus]");

let myLibrary = [];

function Book(title, author, readYet) {
  this.title = title;
  this.author = author;
  this.readYet = readYet;
}

// assigned the value inputs as variable so that they can be passed through the new Book object

addBookToLibrary = (e) => {
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
};

displayBooks = () => {
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
    statusButton.setAttribute("data-name", `changeStatus`);
    statusButton.setAttribute("data-number", `${i}`);

    if (myLibrary[i].readYet === "Not Read") {
      statusButton.classList.add("NotReadBtn");
    }

    const editButton = document.createElement("button");
    editButton.classList.add("EditBtn");
    editButton.textContent = "Edit";
    editButton.setAttribute("data-number", `${i}`);

    const removeButton = document.createElement("button");
    removeButton.classList.add("DeleteBtn");
    removeButton.setAttribute("data-number", `${i}`);

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(statusButton);
    div.appendChild(editButton);
    div.appendChild(removeButton);
    booksAddedContainer.appendChild(div);

    // Book Counter
    bookCounter();
  }

  // Edit button functionality

  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", (event) => {
      let editNum = event.target.getAttribute("data-number");
      let titleInput = document.createElement("input");
      let authorInput = document.createElement("input");
      titleInput.classList.add("editInputField");
      authorInput.classList.add("editInputField");

      // giving the inputs value of what your previously entered to make the edit easier

      titleInput.value = myLibrary[editNum]["title"];
      authorInput.value = myLibrary[editNum]["author"];
      //

      let saveChanges = document.createElement("button");
      saveChanges.classList.add("saveChangesBtn");
      saveChanges.textContent = "Save Changes";

      changeTitleAuthor = () => {
        if (titleInput.value === "") {
          alert("Please enter a title");
          return;
        } else if (authorInput.value === "") {
          alert("Please enter an author");
          return;
        } else {
          myLibrary[editNum]["title"] = titleInput.value;
          myLibrary[editNum]["author"] = authorInput.value;
        }

        let p1 = document.createElement("p");
        p1.textContent = myLibrary[editNum].title;

        let p2 = document.createElement("p");
        p2.textContent = myLibrary[editNum].author;

        booksAdded[editNum].replaceChild(p1, booksAdded[editNum].childNodes[0]);
        booksAdded[editNum].replaceChild(p2, booksAdded[editNum].childNodes[1]);

        booksAdded[editNum].childNodes[3].style.display = "none";
        booksAdded[editNum].childNodes[4].style.display = "block";
        // keeps remaking edit btn need to change

        console.log(myLibrary);
      };

      saveChanges.addEventListener("click", changeTitleAuthor);

      // replacing your book title and author nodes with the input

      booksAdded[editNum].replaceChild(
        titleInput,
        booksAdded[editNum].childNodes[0]
      );

      booksAdded[editNum].replaceChild(
        authorInput,
        booksAdded[editNum].childNodes[1]
      );

      booksAdded[editNum].childNodes[3].style.display = "none";

      booksAdded[editNum].insertBefore(
        saveChanges,
        booksAdded[editNum].childNodes[3]
      );
    });
  }

  // getElementByClassName gives an array of objects, so we're getting every bookAdded div and adding the data-number attribute to it

  removeFromLibrary = (event) => {
    // getting the data-number from the delete button
    let num = event.target.getAttribute("data-number");
    // removing the a book from the myLibrary array. If we delete the object then we get empty objects within the array and the delete
    // button doesn't align with the object. Splice lets us remove the object without any empty objects left in there
    myLibrary.splice(num, 1);
    clearBooksAdded();

    // now that we have this in the displayBooks function and we have called it again, its going to loop through the updated myLibrary
    // array and assign 'updated' data-numbers to the remove buttons.

    displayBooks();
  };

  // Delete Button event listener added in a loop so that once a new book is added a loop is ran to add an event listener to that button

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", (event) => {
      removeFromLibrary(event);
    });
  }

  changeToNotRead = (event) => {
    // getting the data-number from the delete button
    let num = event.target.getAttribute("data-number");
    if (myLibrary[num].readYet === "Read") {
      myLibrary[num].readYet = "Not Read";
      const statusButton = document.createElement("button");

      statusButton.classList.add("NotReadBtn");
    }
    clearBooksAdded();

    displayBooks();
  };

  // Read Button event listener added in a loop to add an event listener to button

  for (let i = 0; i < readBtn.length; i++) {
    readBtn[i].addEventListener("click", (event) => {
      changeToNotRead(event);
    });
  }

  changeToRead = (event) => {
    let num = event.target.getAttribute("data-number");
    if (myLibrary[num].readYet === "Not Read") {
      myLibrary[num].readYet = "Read";
      const statusButton = document.createElement("button");

      statusButton.classList.add("ReadBtn");
    }
    clearBooksAdded();

    displayBooks();
  };

  // Not Read Button event listener added in a loop to add an event listener to button

  for (let i = 0; i < notReadBtn.length; i++) {
    notReadBtn[i].addEventListener("click", (event) => {
      changeToRead(event);
    });
  }
};

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

// Book counter function to keep track of books read vs books not read

let booksReadCount = 0;
let booksNotReadCount = 0;

bookCounter = () => {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].readYet === "Read") {
      booksReadCount++;
    } else if (myLibrary[i].readYet === "Not Read") booksNotReadCount++;
  }
  booksRead.innerHTML = `Books Read: ${booksReadCount}`;
  booksNotRead.innerHTML = `Books Read: ${booksNotReadCount}`;
  booksReadCount = 0;
  booksNotReadCount = 0;
};

// Event Listeners

addBookBtn.addEventListener("click", addBookToLibrary);
