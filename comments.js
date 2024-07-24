//create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const comments = require('./comments.json');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    username: req.body.username,
    comment: req.body.comment,
  };
  comments.push(newComment);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      res.status(500).send('Server error');
    }
    res.json(newComment);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});