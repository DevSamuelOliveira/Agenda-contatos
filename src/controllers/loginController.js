const usersModel = require('../models/usersModel')

exports.LoginPage = async (req, res, next) => {
  res.render('login', {msg: req.flash('error')})

  if(req.session.login != "" && req.session.login != undefined){
    const session = require('../models/sessions')
    await session.findOneAndDelete(req.session.id)
  }
}

exports.verifyLogin = (req, res) => {

  usersModel.find({$or:[{user: req.body.user}, {email: req.body.user}]})
  .then((dados) => {
      const dadosLogin = dados
      if (dadosLogin.length != 0){ 
        if((req.body.user == dadosLogin[0].user || req.body.user == dadosLogin[0].email) && req.body.passwd == dadosLogin[0].passwd){
          if(req.body.remember == "on"){
            req.session.login = dadosLogin[0].user
          }else{
            req.session.cookie.maxAge = 1000 * 60 * 20
            req.session.login = dadosLogin[0].user
          }
          var login = true
        }
      }
    if (login == true){
      res.redirect('/')
    }else{
      req.flash('error', 'Usuário ou senha incorreto')
      res.redirect('/login')
    }
  })
}