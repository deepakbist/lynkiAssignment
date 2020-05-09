const mongoose = require('mongoose');
const User = mongoose.model('User');
const nodemailer = require("nodemailer");
const config = require('../config/dev');
const transporter = nodemailer.createTransport(config.smtp);

module.exports = app => {
  
    app.post('/register',(req,res)=>{
        let {firstName,lastName,email,phoneNumber,password,confirmPassword} = req.body;
        if(!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword){
            return res.status(400).send({status:0,err: "required Fields are missing"});
        }
        if(password !== confirmPassword){
            return res.status(400).send({status:0,err: "password do not match"});
        }
        const user = new User(req.body);
        user.save().then(()=>{
            transporter.sendMail({
                from: 'deepak111224@gmail.com',
                to: email,
                subject: 'Registration Successful',
                text: 'Your account is successfully registered'
            },function(err,message){
                if(err){
                    return res.status(400).send({status:0,err: err});
                }
                res.status(200).send({status:1,message:'successfully registered'});
            })
        })
        .catch((err)=>{
            return res.status(400).send({status:0,err: err});
        })
    })
  
  };
  