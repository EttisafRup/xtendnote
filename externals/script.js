// Creating a ToDo List (Assignment Project)

// Search Bar -->
let sbar = document.getElementById('searchTxt');

sbar.addEventListener("input", function(e) {

    let inval = sbar.value.toUpperCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element) {

        // Grabbing the Element of each notes user saved

        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inval)) {
            element.style.display = 'block';
            
        } else {
            element.style.display = 'none';
        }
        
    })

    
})

// Defining A Click Function. (We can also do it by putting onclick attribute on index, but it's not a suggested way to do)

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    // Get Element for Text Area
    let addTxt = document.getElementById('addTxt');

    // Getting a item from LocalStorage. It's just a delclearation
    let notes = localStorage.getItem("notes");

    // ifElseStatement to declear
    if (notes == null) {
        notesObj = [];
        // If the value is blank, then put blank
    } else {
        notesObj = JSON.parse(notes)
    }
    // Else - If the value is valid, parse it to the notes (the variable we decleared before)

    // Pushing the value inputed 
    notesObj.push(addTxt.value);
    // Updating the Local Storage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";

    console.log(notesObj);

    showNotes();

})

// Declearing the showNotes() function

function showNotes() {

    // (REDECLEARING) Getting a item from LocalStorage. It's just a delclearation
    let notes = localStorage.getItem("notes");

    // (REDECLEARING) ifElseStatement 
    if (notes == null) {
        notesObj = [];
        // If the value is blank, then put blank
    } else {
        notesObj = JSON.parse(notes)
    }
    // Else - If the value is valid, parse it to the notes (the variable we decleared before)

    // Now, Adding a Card type to show the saved noted 

    let html = "";
    // html is a blank variable

    // Adding a forEach Loop to make a loop of adding notes -->
    // Parameters are element and index
    notesObj.forEach(function (element, index) {
        html +=
            `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text"> ${element}</p>
                    <button id=${index} onclick="delNote(this.id);" class="btn btn-primary">Delete Note</button>
                    </div>
                </div> 
                `

        //   Applying the Card on showNotes              

    });
    let notesElm = document.getElementById('notes');

    if (notesObj.lenth != 0) {
        notesElm.innerHTML = html;

    } else {
        notesElm.innerHTML = 'Nothing to show! Add some notes first!!'
    }
}


// Calling the Function to display the notes permanently. It will be called everytime the page reloads :) -->
showNotes();

// Now, The Card applying is working.

// ----> Deleting a Note <----

// Let's make a fuction that deletes a note! -->

function delNote(index) {

// Same ifElse statement as before :)

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes)
    }

    // Splicing a total Object, which one is beginning from index - 1

    notesObj.splice(index, 1);

    // Re entering the object into localStorage again
    
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}