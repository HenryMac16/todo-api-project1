var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); //returns a function

//CRUD - create read update delete
app.post('/todos', (req, res) => { //for resource creation
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos}) //create an array and set it equal to todos
  }, (e) => {
    res.status(400).send(e);
  })
});
//this callback fires when app runs
app.listen(3000, () => {
  console.log('Started on port 3000')
});

module.exports = {app};
