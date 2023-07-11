import Book from "./bookModule";

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
                (book) => new Book(book.id, book.name, book.author)
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
          <button class="delete-btn" onClick="bookCollection.removeBook('${book.id}')">Remove</button>
        `;
            this.bookList.appendChild(bookDiv);
        });
    }

    generateUniqueId() {
        let newId;
        do {
            newId = Math.floor(Math.random() * 1000000);
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
        const bookId = Number(id);
        this.bookData = this.bookData.filter((book) => book.id !== bookId);

        this.displayBooks();
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem('bookData', JSON.stringify(this.bookData));
    }
}

export default BookCollection;
