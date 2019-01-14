var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
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
  });
});
//this callback fires when app runs

//GET /todos/ID-make it dynamic
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
      res.status(200).send({todo}); //todo:todo
  }).catch((e) => {
    res.status(404).send();
  });
  //validate id using isValid
    //stop function execution, respond with 404, empty send
  // findById, query todo
    //success
      //if todo - send it back
      //else - send back 404, empty body
    //error
      // 400 - send empty body back

});

app.listen(3000, () => {
  console.log('Started on port 3000')
});

module.exports = {app};
