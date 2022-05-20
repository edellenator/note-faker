// Notes api routes go here
const fs = require('fs')
const path = require ('path')
const router = require('express').Router();
const { nanoid } = require('nanoid');
const { notes } = require('../../db/notesdb');

router.get('/notes', (req, res) => {
    let results = notes;
    console.log();
    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = nanoid(10);
    const note = req.body;
    const notesArray = [notes]
    notesArray.push(note);
    console.log(note);
    console.log(notes);
    fs.writeFileSync(
      path.join(__dirname, '../../db/notesdb.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    res.json(note)
});


module.exports = router;
