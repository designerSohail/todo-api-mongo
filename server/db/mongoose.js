const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://developerk:myDatabase786@ds225028.mlab.com:25028/todo-app')
module.exports.mongoose = mongoose