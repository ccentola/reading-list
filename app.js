// book constructor ///////////////////////////////////////////////////////////
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor /////////////////////////////////////////////////////////////
function UI() {

}

// add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    // create element
    const row = document.createElement('tr');

    // insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `

    // append row to list
    list.appendChild(row);

}

// show alert
UI.prototype.showAlert = function(message, className) {
    // create div
    const div = document.createElement('div');

    // add classes
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));

    // get parent
    const container = document.querySelector('.container');

    // get form
    const form = document.querySelector('#book-form');

    // insert alert
    container.insertBefore(div, form);

    // timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// event listeners ////////////////////////////////////////////////////////////
// event listener for add
document.getElementById('book-form').addEventListener('submit', function(e) {
    
    // get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instantiate a new book
    const book = new Book(title, author, isbn);

    // instantiate UI
    const ui = new UI();

    //validate
    if(title === '' || author === '' || isbn === '') {
        // error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        // success alert
        
        // add book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert('Book added!', 'success');

        // clear fields
        ui.clearFields();

    }

    e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    // instantiate UI
    const ui = new UI();

    // delete book
    ui.deleteBook(e.target);

    // show message
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();
});