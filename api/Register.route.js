const express = require('express');
const registerRoutes = express.Router();

let Registraton = require('./Register.model');

registerRoutes.route('/add').post((req,res)=>{
    let register = new Registraton(req.body);
    register.save()
    .then(register => {
        res.status(200).json({'register' : 'registeration success fully' })
    })
    .catch(err=> {
        res.status(400).send("unable to save the database")
    });
});

registerRoutes.route('/').get(function (req, res) {
    Registraton.find(function(err, register){
    if(err){
      console.log(err);
    }
    else {
      res.json(register);
    }
  });
});

// Defined edit route
registerRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Registraton.findById(id, function (err, register){
      res.json(register);
  });
});

//  Defined update route
registerRoutes.route('/update/:id').post(function (req, res) {
  Registraton.findById(req.params.id, function(err, register) {
  if (!register)
    res.status(404).send("data is not found");
  else {
    register.username = req.body.username;
    register.emailid = req.body.emailid;
    register.mobileno = req.body.mobileno;
    register.password = req.body.password;

    register.save().then(register => {
        res.json('Update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});

// Defined delete | remove | destroy route
registerRoutes.route('/delete/:id').get(function (req, res) {
  Registraton.findByIdAndRemove({_id: req.params.id}, function(err, register){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
})

module.exports = registerRoutes;


