const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  user: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  passwd: {type: String, required: true}
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel