const users = require('../models/usersModel')

exports.CadastroPage = function (req, res){
  res.render('cadastro', {msg: req.flash('error')})
}

exports.CreateUser = function (req, res){
  const user = req.body.user
  const passwd = req.body.passwd
  const email = req.body.email

  if(user.length >= 4 && passwd.length >= 4 && email.length > 8){
    
    users.find({user: user})
      .then((dados) =>{
        if(dados.length != 0){
          req.flash('error', 'Usuário já existente')
          res.redirect('/cadastro')
        }else{
          users.find({email: email})
            .then((dados) =>{
              if(dados.length != 0){
                req.flash('error', 'E-mail já existente')
                res.redirect('/cadastro')
              }else{
                users.create({user: req.body.user, passwd: req.body.passwd, email: req.body.email})
                res.cookie("login", "true", {maxAge: 1000 * 60 * 15})
                res.redirect('/')
              }
            })
        }
      })
  }
}

