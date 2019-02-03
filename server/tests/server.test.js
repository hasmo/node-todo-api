const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'Foo 1'
}, {
  _id: new ObjectID(),
  text: 'Foo 2'
}, {
  _id: new ObjectID(),
  text: 'Foo 3'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Something in here';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return a 404 if a todo not found', (done) => {
    let todoId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${todoId}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 is an invalid id is encountered', (done) => {
    request(app)
      .get('/todos/111')
      .expect(404)
      .end(done);
  });

  describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var todoId = todos[0]._id.toHexString();

        request(app)
          .delete(`/todos/${todoId}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.todo._id).toBe(todoId);
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            Todo.findById(todoId).then((todo) => {
              expect(todo).not.toBeTruthy();
              done();
            }).catch((e) => done(e));
          });
    });

    it('should return 404 if todo not found', (done) => {
      let todoId = new ObjectID().toHexString();

      request(app)
        .delete(`/todos/${todoId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
      request(app)
        .delete('/todos/111')
        .expect(404)
        .end(done);
    });
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    let todoId = todos[0]._id.toHexString();
    let text = 'Something new for the text';
    let completed = true;

    request(app)
      .patch(`/todos/${todoId}`)
      .send({text, completed})
      .expect(200)
      .expect((res) => {

        expect(res.body.todo.text).toEqual(text);
        expect(res.body.todo.completed).toEqual(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completed at when todo is not completed', (done) => {
    let todoId = todos[1]._id.toHexString();
    let text = 'Something new for the text!!!!';
    let completed = false;

    request(app)
      .patch(`/todos/${todoId}`)
      .send({text, completed})
      .expect(200)
      .expect((res) => {

        expect(res.body.todo.text).toEqual(text);
        expect(res.body.todo.completed).toEqual(false);
        expect(res.body.todo.completedAt).toEqual(null);
      })
      .end(done);
  });
});

