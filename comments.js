//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define the port
const port = 3000;

//define the comments
let comments = [
    { id: 1, author: 'John', text: 'Hello World' },
    { id: 2, author: 'Jane', text: 'Hi, How are you?' }
];

//define the routes
app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});