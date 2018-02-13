const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

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

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) return res.status(404).send('Todo couldnot be removed due to wrong id format!')
	Todo.findByIdAndRemove(id).then(doc => {
		if (!doc) return res.status(404).send('Todo not found!')
		res.send({doc})
	}, err => {
		log('Unable to remove todo', err)
	}).catch(err => {
		res.status(400).send('Bad Request' + err)
	})
})

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id
	var body = _.pick(res.body, ['name', 'completed'])
	if (!ObjectID.isValid(id)) return res.status(404).send('Invalid id format')
	if (_.isBoolean(body.completed) && body.completed) {
	  body.completedAt = new Date().getTime()
	} else {
	  body.completed = false
		body.completedAt = null
	}
	Todo.findByIdAndUpdate(id, {
		$set: body
	}, {
		returnOriginal: false
	}).then(doc => {
		if (!doc) res.status(404).send('Todo not found!')
		res.status(200).send({doc})
	}).catch(err => res.status(400).send('An error occured' + err))
})

app.listen(port, () => {
	log('Server is running at ' + port)
})
module.exports = {app}
function log(str, arg = "") {
	console.log(str, arg)
}
