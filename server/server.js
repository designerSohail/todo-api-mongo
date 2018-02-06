const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {User} = require('./models/user')
const {Todo} = require('./models/todo')

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

app.listen(3000, () => {
	log('Server is running.')
})
module.exports = {app}
function log(str, arg = "") {
	console.log(str, arg)
}