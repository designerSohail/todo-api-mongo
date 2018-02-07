const {ObjectID} = require('mongoose')
const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo.js')

// findById() returns docs based up id provided
// find() // find all iteams based on object passed
// findOne() // find the only first item rather there is dozens of item