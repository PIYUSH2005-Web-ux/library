const library = [];

function book(id,title,author,pages,read=false){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

book.prototype.toggleReadStatus = function(){
    this.read === false ? this.read = true : this.read = false ;
}

function addBookToLibrary(){
    const book = ;
}
