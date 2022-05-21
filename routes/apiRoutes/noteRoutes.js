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
    const notesArray = notes
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../../db/notesdb.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    res.json(note)
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    let notesArray = notes;
    console.log(notesArray);
    var idIndex = notesArray.findIndex(function(item){
        return item.id === id
    });
    const removedNotesArr = notesArray.splice(idIndex, 1);
    console.log(notesArray);
    console.log(removedNotesArr);
    fs.writeFileSync(
        path.join(__dirname, '../../db/notesdb.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    res.json({
        message: 'deleted',
        changes: removedNotesArr,
        id: id
      });
})


module.exports = router;
