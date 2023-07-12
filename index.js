/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import Book from './modules/bookModule.js';
import { homeClick, addClick, contactClick } from './modules/eventHandlerModule.js';
import { DateTime } from './modules/luxon/build/es6/luxon.js';

window.getCurrentDateTime = function () {
  return DateTime.local();
};

window.formatDateTime = function (dateTime, format) {
  return dateTime.toFormat(format);
};

const updateDateTime = function () {
  const currentDateTime = window.getCurrentDateTime();
  const formattedDateTime = window.formatDateTime(currentDateTime, 'yyyy-MM-dd HH:mm:ss');

  const datetimeDiv = document.getElementById('datetime');
  datetimeDiv.textContent = formattedDateTime;
};

updateDateTime();
setInterval(updateDateTime, 1000);

class BookCollection {
  constructor() {
    this.bookData = [];
    this.bookList = document.getElementById('books-container');
    this.form = document.getElementById('submit-form');
    this.loadBooks();
    this.displayBooks();

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addBook();
    });
  }

  loadBooks() {
    const storedBookData = localStorage.getItem('bookData');
    if (storedBookData) {
      this.bookData = JSON.parse(storedBookData).map(
        (book) => new Book(book.id, book.name, book.author),
      );
    }
  }

  displayBooks() {
    this.bookList.innerHTML = '';

    this.bookData.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book-plate');
      bookDiv.innerHTML = `
        <p>"${book.name}" by ${book.author}</p>
        <button class="delete-btn" onClick= "bookCollection.removeBook('${book.id}')">Remove</button>
      `;
      this.bookList.appendChild(bookDiv);
    });
  }

  generateUniqueId() {
    let newId;
    do {
      newId = Math.floor(Math.random() * 1000000);
      // eslint-disable-next-line no-loop-func
    } while (this.bookData.some((book) => book.id === newId));

    return newId;
  }

  addBook() {
    const bookName = document.getElementById('title').value;
    const bookAuthor = document.getElementById('book-author').value;

    const newBook = new Book(this.generateUniqueId(), bookName, bookAuthor);
    this.bookData.push(newBook);

    document.getElementById('title').value = '';
    document.getElementById('book-author').value = '';

    this.displayBooks();
    this.updateLocalStorage();
  }

  // Remove a book
  // eslint-disable-next-line no-unused-vars
  removeBook(id) {
    // Convert the id to a number
    const bookId = Number(id);

    // Filter the bookData array
    this.bookData = this.bookData.filter((book) => book.id !== bookId);

    // Display the books
    this.displayBooks();
    this.updateLocalStorage();
  }

  // Update the local storage after removing the book
  updateLocalStorage() {
    localStorage.setItem('bookData', JSON.stringify(this.bookData));
  }
}

// Create an instance of the BookCollection class
const bookCollection = new BookCollection();

// Make the bookCollection variable accessible in the global scope
window.bookCollection = bookCollection;

// handle page link clicks

const homeLink = document.getElementById('home-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');

document.addEventListener('DOMContentLoaded', () => {
  homeLink.style.display = 'block';
  addLink.style.display = 'none';
  contactLink.style.display = 'none';
});

// Make the  variable accessible in the global scope
window.homeClick = homeClick;
window.addClick = addClick;
window.contactClick = contactClick;

// Export the event handlers for other modules to use
export { homeClick, addClick, contactClick };
