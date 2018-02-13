const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {User} = require('./models/user')
const {Todo} = require('./models/todo')
const {ObjectID} = require('mongodb')
const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
	var todo = new Todo({
		name: req.body.name
	})
	todo.save().then(doc => {
		log('Successfully saved todo: ', doc.name)
		res.send(doc)
	}, err => {
		log('Unable to save document ', err)
		res.status(400).send(err)
	})
})

app.get('/todos', (req, res) => {
	Todo.find().then(todos => {
		res.send(todos)
	}, err => {
		res.status(400).send(err)
	})
})

app.get('/todos/:id', (req, res) => {
	Todo.findById().then(todo => {
		const id = req.params.id
		if (!ObjectID.isValid(id)) return res.status(404).send('Requested todo id is not in valid format!')
		Todo.findById(id).then(todo => {
			if (!todo) return res.send(404).send('Requested todo not found!')
			res.send({todo})
		}, err => {
			log('Unable to fetch docs', err)
		}).catch(e => {
			res.status(400).send()
		})
	})
})

app.get('/todos/delete/:id', (req, res) => {
	const id = req.params.id
	if (Object.isValid(id)) return res.status(404).send('Todo couldnot be removed due to wrong id format!')
	Todo.findByIdAndRemove(id).then(doc => {
		if (!todo) return res.status(404).send('Todo not found!')
		res.send({todo})
	}, err => {
		log('Unable to remove todo', err)
	}).catch(err => {
		res.status(400).send()
	})
})

app.listen(port, () => {
	log('Server is running at ' + port)
})
module.exports = {app}
function log(str, arg = "") {
	console.log(str, arg)
}
