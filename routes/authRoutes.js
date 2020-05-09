const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = app => {
  

  app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    if(!email|| !password){
        return res.status(400).send({status:0,message:'Required fields are missing'});
    }
    User.findOne({email:email}).exec().then((user)=>{
        if(!user){
            console.log('user--',user);
            return res.status(400).send({status:0,err: "user not found!"});
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err || !isMatch){
                return res.status(400).send({status:0,message:'Incorrect password'});  
            }
            res.status(200).send({status:1,user:user});
        });
    }).catch(err=>{
        return res.status(400).send({status:0,err: err});
    })
  })


};
