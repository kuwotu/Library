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
const saveChangesButton = document.getElementsByClassName("saveChangesBtn");
const booksAddedDiv = document.getElementsByClassName("BooksAdded");

const storedLibrary = JSON.parse(localStorage.getItem("currentLibrary"));

let myLibrary = [];

saveToLocalStorage = () =>
  localStorage.setItem("currentLibrary", JSON.stringify(myLibrary));

function Book(title, author, readYet) {
  this.title = title;
  this.author = author;
  this.readYet = readYet;
}

Book.prototype.changeReadStatus = function () {
  if (this.readYet === "Read") {
    this.readYet = "Not Read";
  } else if (this.readYet === "Not Read") {
    this.readYet = "Read";
  }
};

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
    if (myLibrary[i].readYet === "Not Read") {
      statusButton.classList.add("NotReadBtn");
    } else if (myLibrary[i].readYet === "Read") {
      statusButton.classList.add("ReadBtn");
    }
    statusButton.setAttribute("data-number", `${i}`);

    const editButton = document.createElement("button");
    editButton.classList.add("EditBtn");
    editButton.textContent = "Edit";
    editButton.setAttribute("data-number", `${i}`);

    const saveChangesButton = document.createElement("button");
    saveChangesButton.classList.add("saveChangesBtn");
    saveChangesButton.textContent = "Save Changes";
    saveChangesButton.setAttribute("data-number", `${i}`);
    saveChangesButton.style.display = "none";

    const removeButton = document.createElement("button");
    removeButton.classList.add("DeleteBtn");
    removeButton.setAttribute("data-number", `${i}`);

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(statusButton);
    div.appendChild(editButton);
    div.appendChild(saveChangesButton);
    div.appendChild(removeButton);
    booksAddedContainer.appendChild(div);
  }

  // Book Counter
  bookCounter();

  // run the button event listeners in displayBooks but outside the loop to prevent
  // the event listeners being added multiple times by the loop.

  readButtonLoop();
  notReadButtonLoop();
  deleteBtnLoop();
  editBtnLoop();
};

// Edit button functionality

editBtnLoop = () => {
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", (event) => {
      let num = event.target.getAttribute("data-number");
      saveChangesButton[num].style.display = "block";
      editBtn[num].style.display = "none";

      let titleInput = document.createElement("input");
      let authorInput = document.createElement("input");
      titleInput.classList.add("editInputField");
      authorInput.classList.add("editInputField");

      // giving the inputs value of what your previously entered to make the edit easier

      titleInput.value = myLibrary[num]["title"];
      authorInput.value = myLibrary[num]["author"];

      // replaces the p tags with the input on the DOM

      booksAdded[num].replaceChild(titleInput, booksAdded[num].childNodes[0]);

      booksAdded[num].replaceChild(authorInput, booksAdded[num].childNodes[1]);

      saveChanges = () => {
        if (titleInput.value === "") {
          alert("Please enter a title");
          return;
        } else if (authorInput.value === "") {
          alert("Please enter an author");
          return;
        } else {
          myLibrary[num]["title"] = titleInput.value;
          myLibrary[num]["author"] = authorInput.value;
        }

        // so that the save changes button dissapears and the edit button comes back
        // also saves us from having to manually change the inputs to P tags

        clearBooksAdded();
        displayBooks();
      };

      for (let l = 0; l < saveChangesButton.length; l++) {
        saveChangesButton[num].addEventListener("click", saveChanges);
      }
      saveChangesButton[i].addEventListener("click", saveToLocalStorage);
    });
  }
};

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

// TRYING TO IMPLIMENT READ STATUS PROTOTYPE
toggleReadStatus = (event) => {
  let num = event.target.getAttribute("data-number");
  myLibrary[num].changeReadStatus();
  clearBooksAdded();
  displayBooks();
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

// Read, Not read and delete Button event listeners added in a loop to add an event listener for every new button made

readButtonLoop = () => {
  for (let i = 0; i < readBtn.length; i++) {
    readBtn[i].addEventListener("click", (event) => {
      toggleReadStatus(event);
    });
    readBtn[i].addEventListener("click", saveToLocalStorage);
  }
};

notReadButtonLoop = () => {
  for (let i = 0; i < notReadBtn.length; i++) {
    notReadBtn[i].addEventListener("click", (event) => {
      toggleReadStatus(event);
    });
    notReadBtn[i].addEventListener("click", saveToLocalStorage);
  }
};

deleteBtnLoop = () => {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", (event) => {
      removeFromLibrary(event);
    });
    deleteBtn[i].addEventListener("click", saveToLocalStorage);
  }
};

addBookBtn.addEventListener("click", addBookToLibrary);
addBookBtn.addEventListener("click", saveToLocalStorage);

// As soon as the document loads, take the storedLibrary and feed it through the Book
// object to make the previously stored books have the prototype function

document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (storedLibrary) {
      for (let i = 0; i < storedLibrary.length; i++) {
        const newBook = new Book(
          storedLibrary[i]["title"],
          storedLibrary[i]["author"],
          storedLibrary[i]["readYet"]
        );
        myLibrary.push(newBook);
      }
    }
    displayBooks();
  },
  false
);
