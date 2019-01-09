// const MongoClient = require('mongodb').MongoClient;

//object destructuring
// var user = {name: 'Henry', age: 25}
// var {name} = user; //creates a new name variable
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server'); //return makes program stop
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err)
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2)) //ops stores all of the docs that are inserted
  // });

  // db.collection('Users').insertOne({
  //   //id: 123,
  //   name: 'Henry',
  //   age: 18,
  //   location: 'Los Angeles'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert todo', err)
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });


  client.close(); //closes the connection
});
