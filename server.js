require('dotenv').config()
const fs = require('fs').promises
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const express = require('express')
const app = express()
const port = process.env.port || 3000
const data = new Date()
const routes = require('./routes')
const middleGlobal = require('./src/middlewares/middleGlobal')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const cookie = require('cookie-parser')

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.use(session({secret: 'lajdo1u',
store: MongoStore.create({
  mongoUrl: process.env.conection,
  // ttl: 13 * 2 * 14 * 24 * 60 * 60,
}),
resave: false,
saveUninitialized: false,
cookie: {maxAge: 1000 * 60 * 60 * 24 * 30 * 12}
}))

app.use(flash())

app.use(cookie())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(middleGlobal.global)
app.use(routes)

mongoose.connect(process.env.conection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log("Conectado no banco com sucesso")
    app.emit('dbconect')
  }).catch(() => {
    app.emit('dberror')
  })

app.on('dbconect', () => {
  fs.writeFile(__dirname + '/logs/StartServer.txt', startServer(), {flag: 'a', encoding: 'utf8'})
  console.log("Aplicação iniciada na porta", port)
  app.listen(port)
})

app.on('dberror', () => {
  console.log("A conexão com o banco de dados não foi estabelecida e a aplicação não foi iniciada")
  fs.writeFile(__dirname + '/logs/logsErrorConectDB.txt', errorDB(), {flag: 'a', encoding: 'utf8'})
})

const startServer = () => `Servidor ininciado - ${data.toString()}\n`
const errorDB = () => `Erro de inicialização no servidor causado pelo banco de dados - ${data.toString()}\n`
