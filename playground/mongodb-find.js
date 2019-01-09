const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server'); //return makes program stop
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');
  //we do not need to specify any arguements -- this means we want all the data from the database
  //this is a pointer(cursor) to the documents because returning actual documents would be time consuming
  //.ToArray gives us the actual documents that we are looking for, returns a promise
  /*
  db.collection('Todos').find({
    _id: new ObjectID('5c32ee7e8f96d3376163d0eb')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('unable to fetch todos', err)
  });
*/
/*
db.collection('Todos').find().count().then((count) => {
  console.log(`Todos count: ${count}`);
}, (err) => {
  console.log('unable to fetch todos', err)
}); */

  db.collection('Users').find({name: 'Henry'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }), (err) => {
    console.log('unable to fetch users', err)
  }
  //client.close(); //closes the connection
});
