const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server'); //return makes program stop
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  //delete Many
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //   console.log(result);
    // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });
  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
  //   console.log(result);
  // })
  // db.collection('Users').deleteMany({name: 'Henry'}).then((result) => {
  //   console.log(`Deleted ${result} users with the name: Henry`);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5c3540980cd8103e6d79a6ba')}).then((result) => {
    console.log(result);
  });
  //client.close(); //closes the connection
});
