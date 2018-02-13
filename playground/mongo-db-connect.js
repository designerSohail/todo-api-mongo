const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to mongodb server')
	}
	// console.log('Connected to mongoDB server!')
	// db.collection('Todos').insertOne({
	// 	name : "Complete Node.JS course.",
	// 	completed : false
	// }, (err, result) => {
	// 	if (err) {
	// 	  return console.log('Unable to insert data', err)
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2))
	// })
	// db.collection('Users').insertOne({
	// 	name : "Sohail Khan",
	// 	age : 15,
	// 	location : "Butwal, Nepal"
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert data', err)
	// 	}
	// 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
	// })
	db.close()
})