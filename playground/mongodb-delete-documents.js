function log(str) {
	console.log(str)
}
const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) return console.log('Unable to connect with mongo server')
	console.log('Connected to mongo servers')
	db.collection('Todos').deleteMany({
		name: 'Complete Node.JS course.'
	}).then(result => {
		console.log(result)
	}, err => {
		if (err) return console.log('Unable to delete collection')
	})
	db.collection('Todos').deleteOne({
		completed: false
	}).then(result => {
		console.log(result)
	})
	db.collection('Todos').findOneAndDelete({
		completed: false
	}).then(result => {
		log(result)
	})
	db.close()
})