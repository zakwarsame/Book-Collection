// Book Class: Represents a Book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: For UI tasks

class UI {
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt"></i></i></a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Disappear in 2 secs
        setTimeout(() => document.querySelector('.alert').remove(), 2000)

    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store Class: For Storage

class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books')=== null){
            books = []
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(books);
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index)=> {
            if (book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }

    
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
const submitBook = e => {
    // prevent actual submit
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields', 'danger')

    } else{

    // Instantiate book}
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Add Book to Store

    //show success message

    UI.showAlert('Book successfully added', 'success')
    // Clear Fields
    UI.clearFields();

    }
}
document.querySelector('#book-form').addEventListener('submit', submitBook)

// Event: Remove a Book

const removeBook = e => {
    UI.deleteBook(e.target);
    UI.showAlert('Book deleted', 'success')
}
document.querySelector('#book-list').addEventListener('click', removeBook)