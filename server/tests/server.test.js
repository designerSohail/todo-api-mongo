const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {ObjectID} = require('mongodb')

var todos = [
	{
		_id: new ObjectID()
		name: "Go to School"
	},{
		_id: new ObjectID()
		name: "connfigure github repo"
	}
]

beforeEach(done => {
	Todo.remove({}).then(() => {
		Todo.insertMany(todos)
	}).then(() => {
		done();
	})
})

describe('POST /Todos', () => {
	it('should create a new todo', done => {
		var name = 'Test Todo Test'
		request(app)
			.post('/todos')
			.send({name})
			.expect(200)
			.expect(res => {
				expect(res.body.name).toBe(name)
			})
			.end((err, res) => {
				if (err) return done(err)
				Todo.find().then(todos => {
					expect(todos.length).toBe(3)
					expect(todos[2].name).toBe(name)
					done()
				}).catch(e => done(e))
			})
	})

	it('should not create todo with invalid data', done => {
		request(app)
			.post('/todos')
			.send({name: ""})
			.expect(400)
			.end((err, res) => {
				if (err) return done(err)
				Todo.find().then(todos => {	
					expect(todos.length).toBe(2)
					done()
				}).catch(e => done(e))
			})
	})
})

describe('GET /todos', () => {
	it('should get all todos', done => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect(res => {
				expect(res.body.length).toBe(2)
			})
			.end(done)
	})
})

describe('GET /todos/id', () => {
	it('shoud return respective todo with id', done => {
		request(app)
			.get('/todos/' + todos[0]._id.toHexString())
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(todos[0].text)
			})
			.end(done)
	})
	it('should not return todo by invalid id', done => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done)
	})
	it('should not return 404 if not found', done => {
		const hexId = new ObjectID().toHexString()
		request(app)
			.get('/todos/' + hexId)
			.expect(404)
			.end()
	})
})
