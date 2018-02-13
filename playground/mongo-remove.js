const {mongoose} = require('../server/db/mongoose')
const {User} = require('../server/models/user')
const {Todo} = require('../server/models/todo')
const {ObjectID} = require('mongodb')

// Todo.remove({}).then(docs => {
//   log(docs)
// })
// Todo.findOneAndRemove find the doc and remove first one and returns that doc in promise
// Todo.findByIdAndRemove find the doc by id then remove that and returns that doc in promise
Todo.findByIdAndRemove('5a82652518589d0400c49ec7').then(doc => {
  log(doc)
})
function log(str, arg = '') {
  console.log(str, arg)
}
