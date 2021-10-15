const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const {v4: uuid} = require('uuid');

class NoteService {
    saveNote(note) {
        const {title, text} = note
        if (!title || !text) {
            throw new Error('Please enter a title and a body of text to save your note.');
        }
        const newNote = {
            title,
            text,
            id: uuid()
        }
        return this.getNotes().then(notes => {
            console.log(notes);
            console.log(typeof notes);
            const newNoteArray = [...notes, newNote];
            return newNoteArray;
        }).then((newNotes) => this.write(newNotes)).then(() => newNote)
    }
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
              parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
              parsedNotes = [];
            }
            return parsedNotes
        })
    }
    getNoteById(id) {
        this.getNotes().then(notes => {
            const selectedNote = notes.find(note => note.id !== id);
            return selectedNote;
        })
    }
    removeNoteById(id) {
        //slice or filter js method
        return this.getNotes().then(notes => {
            return notes.filter(note => note.id !== id);
        }).then(newNoteArray => this.write(newNoteArray))
    }
    //helpers
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }
}

module.exports = new NoteService();