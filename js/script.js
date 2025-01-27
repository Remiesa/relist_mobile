document.addEventListener('DOMContentLoaded', () => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(note => addNoteToDOM(note.text, note.checked));

        document.getElementById('addButton').addEventListener('click', () => {
            const newNoteText = document.getElementById('newNote').value;
            if (newNoteText.trim() !== '') {
                addNoteToDOM(newNoteText, false);
                saveNotes();
                document.getElementById('newNote').value = '';
            }
        });
    });

    function addNoteToDOM(text, checked) {
        const notesDiv = document.getElementById('notes');
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        
        noteDiv.innerHTML = `
        <div class="note-header">
                <input type="checkbox" ${checked ? 'checked' : ''}>
                <input type="text" value="${text}" disabled ${checked ? 'class="checked"' : ''}>
                <button class="edit-button" style="background: transparent; color: white; border: none; ${checked ? 'display: none;' : ''}"><i class="fa fa-pencil"></i></button>
                <button class="delete-button" style="background: transparent; color: white; border: none;"><i class="fa fa-trash"></i></button>
            </div>
        `;

        const checkbox = noteDiv.querySelector('input[type="checkbox"]');
        const noteInput = noteDiv.querySelector('input[type="text"]');
        const editButton = noteDiv.querySelector('.edit-button');
        const deleteButton = noteDiv.querySelector('.delete-button');

        checkbox.addEventListener('change', () => {
            noteInput.classList.toggle('checked', checkbox.checked);
            editButton.style.display = checkbox.checked ? 'none' : 'inline';
            saveNotes();
        });

        editButton.addEventListener('click', () => {
            noteInput.disabled = !noteInput.disabled;
            editButton.innerHTML = noteInput.disabled ? '<i class="fa fa-pencil"></i>' : '<i class="fa fa-check"></i>';
        });

        deleteButton.addEventListener('click', () => {
            notesDiv.removeChild(noteDiv);
            saveNotes();
        });

        notesDiv.appendChild(noteDiv);
    }

    function saveNotes() {
        const notes = Array.from(document.querySelectorAll('.note')).map(noteDiv => ({
            text: noteDiv.querySelector('input[type="text"]').value,
            checked: noteDiv.querySelector('input[type="checkbox"]').checked
        }));
        localStorage.setItem('notes', JSON.stringify(notes));
    }