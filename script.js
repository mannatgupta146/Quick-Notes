const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click", () => addNote(""));

function addNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i> 
            <i class="trash fas fa-trash"></i> 
        </div>
        <textarea placeholder="Write something...">${text}</textarea>
    `;

    const saveBtn = note.querySelector(".save");
    const trashBtn = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");

    saveBtn.addEventListener("click", saveNotes);
    trashBtn.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    textarea.addEventListener("input", saveNotes);

    main.appendChild(note);
    saveNotes();
}

function saveNotes() {
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value);

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => addNote(note));
}

loadNotes();
