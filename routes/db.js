const db = require('epress').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

db.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}
);

db.get('/:id', (req, res) => {
    const dbID = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((db) => db.id === dbID);
            return result.length > 0
                ? res.json(result)
                : res.json('No db with that ID');
        }
        );
}
);

db.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newDB = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newDB, './db/db.json');
        res.json(`db added successfully 🚀`);
    } else {
        res.error('Error in adding db');
    }
}
);

db.delete('/:id', (req, res) => {
    const dbID = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((db) => db.id !== dbID);

            writeToFile('./db/db.json', result);

            res.json(`Item ${dbID} has been deleted`);
        }
        );
}
);

module.exports = db;