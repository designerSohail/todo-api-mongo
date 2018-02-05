function log(str) {
	console.log(str)
}
const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) return log('Unable to connect with mongo server')
	db.collection('Todos').findOneAndUpdate({
		completed: false
	},{
		$set: {
			completed: true
		}
	},{
		returnOriginal: false
	}).then(doc => {
		console.log(doc)
	}, err => {
		if (err) return log('Unable to update db')
	})
})