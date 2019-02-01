// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });


  // deleteOne
  // db.collection('Todos').deleteOne({todo: 'Eat Lunch'}).then((result) => {
    // console.log('Deleted one:' + result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({todo: 'x'}).then((result) => {
    // console.log(result);
  // });

  // deleteMany
  // db.collection('Users').deleteMany({name: 'John'}).then((result) => {
    // console.log(result);
  // });

  // findOneAndDelete
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5c53cb74db68e00b9a7dba73')
  }).then((result) => {
    console.log(result);
  });

  // client.close(); 
});
