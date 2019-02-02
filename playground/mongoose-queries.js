const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5c551ba7fce42d6b9dd06dd41';

// if (!ObjectId.isValid(id)) {
//   return console.log('Invalid ID passed');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found.');
//   }

//   console.log('Todo By Id', todo);
// }).catch((e) => console.log('Error', e));

let id = '5c5504bd2c4e585f1db7ebcc';

User.find({
  _id: id
}).then((users) => {
  console.log('Users', users);
});

User.findOne({
  _id: id
}).then((user) => {
  console.log('User', user);
});

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User ID invalid');
  }

  console.log('User by Id', user);
}).catch((e) => console.log('Error', e));
