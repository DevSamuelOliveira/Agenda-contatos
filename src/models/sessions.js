const mongoose = require('mongoose')

const sessionStorage = mongoose.model('sessions', mongoose.Schema({}))

module.exports = sessionStorage
