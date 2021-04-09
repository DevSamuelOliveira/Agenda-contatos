const mongoose = require('mongoose')

const userGlobal = new mongoose.Schema({
  type_contact: {
    type: String,
    required: true,
    enum: ['Comercial', 'Pessoal']
  },
  name_contact: {
    type: String,
    required: true,
  },
  number_cel: {
    type: String,
    default: null
  },
  number_tel: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: "Não registrada"
  }
})

module.exports = userGlobal
