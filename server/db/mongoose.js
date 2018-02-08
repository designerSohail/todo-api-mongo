const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://root:eZ@1/)5r@ds225028.mlab.com:25028/todo-app' || 'mongodb://localhost:27017/TodoApp')
module.exports.mongoose = mongoose