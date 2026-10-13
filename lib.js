
const mylibrary = [];

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
    let id = crypto.randomUUID();
    const newBook = new book(id,title,author,pages,read);
    mylibrary.push(newBook);
}

const table = document.querySelector("tbody");

function displayBooks(){
    if(mylibrary.length === 0){
        const row = document.createElement("tr");
        const column = document.createElement("td");
        column.colSpan = 5;
        column.textContent = "there are no books added yet";
        row.appendChild(column);
        table.appendChild(row);
    }
    else{
        for(let i = 0; i < mylibrary.length;i++){
            const bookProperties =  Object.keys(mylibrary[i]);
            const filteredBookProperties = bookProperties.filter(val => typeof mylibrary[i][val] != "function" && val != "id");
            const row =document.createElement("tr");
            const actions = document.createElement("td");
            const toggleRead = document.createElement("button");
            const deleteButton = document.createElement("button");
            deleteButton.setAttribute("data-book-id", mylibrary[i].id);
            mylibrary[i].read === true ? toggleRead.textContent = "unread" : toggleRead.textContent = "Read";
            deleteButton.textContent = "Delete";
            toggleRead.addEventListener("click", () => {
                mylibrary[i].toggleReadStatus();
                while (table.hasChildNodes()){
                    table.removeChild(firstChild);
                }
                displayBooks();
            } )
            deleteButton.addEventListener("click",() => {
                const deleteId = deleteButton.dataset.Bookid;
                const targetId = mylibrary.findIndex( val => val.id === deleteId);
                if(targetId < 0) return ;
                mylibrary.splice(targetId,1);
                while(table.hasChildNodes()){
                    table.removeChild(table.firstChild);
                }
                displayBooks();
                
            })
            for(let j = 0; j < filteredBookProperties.length;j++){
                const column = document.createElement("td");
                if(filteredBookProperties[j] == "read"){
                    let readstatus = "";
                    if(filteredBookProperties[j] == false){
                        readstatus = "Not read yet";
                    }else if(filteredBookProperties[j] == true){
                        readstatus = "  already read ";
                        column.textContent = readstatus;}
                    else{
                        column.textContent = mylibrary[i][filteredBookProperties[j]];
                    }
                    row.appendChild(column);

                }
                actions.appendChild(toggleRead);
                actions.appendchild(deleteButton);
                row.appendchild(actions);
                table.appendChild(row);

            }

        }
    }
    

    const newBookButton = document.querySelector(".new-book-button");
    const dialog = document.querySelector("dialog");

    const submitButton = document.querySelector(".submit-button");
    const cancelButton = document.querySelector(".cancel-button");

    newBookButton.addEventListener("click", ()=>{
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read").checked = false ;
        dialog.showModal();
    })
}
    submitButton.addEventListener("click",(event) => {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
        event.preventDefault();
        addBookToLibrary(title,author,pages,read);
        dialog.close();
        while(table.hasChildNodes()){
            table.removeChild(table.firstChild);
        }
        

    })
    cancelButton.addEventListener("click",() => {
        dialog.close();
    })

