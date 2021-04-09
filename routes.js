const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const cadastroController = require('./src/controllers/cadastroController')
const agendaController = require('./src/controllers/agendaController')

function verificar (req, res, next) {
  if((req.session.login == "" || req.session.login == undefined)){
    res.redirect('/login')
  }else{
    next()
  }
}

route.get('/', verificar, homeController.HomePage)

route.get('/cadastro', cadastroController.CadastroPage)
route.post('/cadastro', cadastroController.CreateUser)

route.get('/login', loginController.LoginPage)
route.post('/login', loginController.verifyLogin)

route.get('/agenda', agendaController.AgendaPage)
route.get('/agendaTable', agendaController.AgendaTablePage)
route.post('/agenda', agendaController.AgendaCreate)
route.put('/agenda', agendaController.AgendaPut)
route.delete('/agenda', agendaController.AgendaDelete)

module.exports = route