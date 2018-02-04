const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
	  return console.log('Unable to connect with mongo db server')
	}
	console.log('Connected to MongoDB Server')
	db.collection('Todos').find({
		_id: new ObjectID('5a754f02d2b015201317ca4e')
	}).toArray().then(docs => {
		console.log('Todos')
		console.log(JSON.stringify(docs, undefined, 2))
	}, err => {
		if (err) return console.log('Unable to fetch documents')
	})
	db.collection('Todos').find().count().then(count => {
		console.log(count)
	}, err => {
		if (err) return console.log('An error occured while fetching documents.')
	})
})