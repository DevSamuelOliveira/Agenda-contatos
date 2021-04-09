const mongoose = require('mongoose')
const schema = require('../models/userGlobalDados')

exports.AgendaPage = (req, res) => {
  try{
    if (req.session.login != undefined && req.session.login != ""){
      user2 = mongoose.model(req.session.login, schema)
    }else{
      user2 = mongoose.model('userglobals', schema)
    }
  }catch(e){}

  async function getModel(){
    const result = await user2.find()
    res.render('agenda', {user: req.session.login, dados: result})
  }
  getModel()
}

exports.AgendaDelete = (req, res) => {
  
  user2.deleteOne({_id: req.body.id}).then(() => {})

  res.send('Requisição feita com sucesso')

}

exports.AgendaTablePage = (req, res) => {
  const getModel = async function(){
    const result = await user2.find()

    res.render('table_agenda', {user: req.session.login, dados: result})
  }
    
  getModel()
}

exports.AgendaCreate = (req, res) => {
  if(req.body.name_contact.length > 4 && req.body.number_cel.length == 15){

    req.body.number_tel = req.body.number_tel == "" ? null : req.body.number_tel
    req.body.description = req.body.description == "" ? "Não regristada" : req.body.description

    user2.create({
      type_contact: req.body.type_contact,
      name_contact: req.body.name_contact,
      number_cel: req.body.number_cel,
      number_tel: req.body.number_tel,
      description: req.body.description,
    })
    res.send('Requisição feita com sucesso')
  }
}

exports.AgendaPut = (req, res) => {

  if(req.body.name_contact.length > 4 && req.body.number_cel.length == 15){

    req.body.number_tel = req.body.number_tel == "" ? null : req.body.number_tel
    req.body.description = req.body.description == "" ? "Não regristada" : req.body.description

    user2.updateOne({_id: req.body.id}, {
      type_contact: req.body.type_contact,
      name_contact: req.body.name_contact,
      number_cel: req.body.number_cel,
      number_tel: req.body.number_tel,
      description: req.body.description,
    }).then()

    res.send('Requisição feita com sucesso')
  }
}