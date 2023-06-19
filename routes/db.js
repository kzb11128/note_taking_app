const db = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

db.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}
);

db.get('/api/notes/:note_Id', (req, res) => {
    const notedId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((db) => db.note_Id === notedId);
            return result.length > 0
                ? res.json(result)
                : res.json('No db with that ID');
        }
        );
}
);

db.post('/api/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_Id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`note added successfully`);
    } else {
        res.error('Error in adding note');
    }
}
);

db.delete('/api/notes/:note_Id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((db) => db.note_Id !== noteId);

            writeToFile('./db/db.json', result);

            res.json(`Item ${dbID} has been deleted`);
        }
        );
}
);

module.exports = db;