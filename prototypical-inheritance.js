function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = false
}

Book.prototype.info = function() {
    let readString = ''
    if (this.haveRead) {
        readString = 'read'
    } else {
        readString = 'not read yet'
    } 
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295)

