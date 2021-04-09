const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  idade: {type: Number, required: true}
})

const homeModel = mongoose.model('home', homeSchema)

module.exports = homeModel