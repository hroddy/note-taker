const router = require('express').Router();
const noteService = require('../db/noteClass');

router.post('/notes', function (req, res) {
    noteService.saveNote(req.body).then(notes => {
        return res.json(notes);
    }).catch((err) => res.status(500).json(err));
});

router.get('/notes', function (req, res) {
    noteService.getNotes().then(notes => {
        console.log(notes)
        return res.json(notes);
    }).catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', function (req, res) {
    const {id} = req.params;
    noteService.removeNoteById(id).then(notes => {
        res.json(notes);
    });
});

module.exports = router;