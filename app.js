const express = require('express');
const db = require('./user');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({
        info: 'Node.js, express, and postgres API'
    })
});

app.get('/_health', (req, res) => {
    res.status(200).send('Server still running!')
});

app.get('/users/', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});