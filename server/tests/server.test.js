const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

var todos = [
	{
		name: "Go to School"
	},{
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