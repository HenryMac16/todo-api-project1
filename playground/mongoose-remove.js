const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c38ebd40692a669620214ea';

// Todo.remove({}) //cannot pass in an empty document to remove everything

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//also returns the data
//Todo.findOneAndRemove()
//Todo.findByIdAndRemove


Todo.findOneAndRemove({_id: '5c3c2e3d272c015efa1f7fbe'}).then((todo) => {

});
Todo.findByIdAndRemove('5c3c2e3d272c015efa1f7fbe').then((todo) => {
  console.log(todo);
});
