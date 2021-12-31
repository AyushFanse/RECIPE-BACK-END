const  User = require('../model/User');
const Joi = require('joi');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


///////////////////////////* Registration Part *////////////////////////////

exports.register = async (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(50).trim(true).required(),
        last_name: Joi.string().min(3).max(50).trim(true).required(),
        username: Joi.string().trim(true).min(4).max(25).required(),
        password: Joi.string().trim(true).required(),
        email: Joi.string().lowercase().min(6).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        address: Joi.string().min(3).max(200).required(),
        bio: Joi.string().min(3).max(200),
        number: Joi.string().pattern(/^[0-9]+$/).required(),
        saved: Joi.object({})
    })

    var {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});

    var existUser = await User.findOne({"email": req.body.email}).exec();
    if(existUser) return res.status(200).send({msg : "User already exists."});

    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(req.body.password, salt);

    const bio = 'Hey I,m New Here...';
    
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        number:req.body.number,
        address:req.body.address,
        password:Password,
        saved:req.body.saved,
        bio:bio
    })
    try{
        var response = await user.save();
        res.send(response);
    }catch(err){
        res.status(400).send(err);
    }

}




////////////////////////* Login Part */////////////////////////


exports.login = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).email().required(),
        password: Joi.string().min(4).max(15).required()
    })
    
    var {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});

    var existUser = await User.findOne({"email": req.body.email}).exec();
    if(!existUser) return res.status(400).send({msg : "Email not reqistered"});
    var user={};
    user.first_name = existUser.first_name;
    user.last_name = existUser.last_name;
    user.username = existUser.username;
    user._id = existUser._id;
    user.saved=existUser.saved;
    user.bio=existUser.bio;
    

    var isValid = await bcrypt.compare(req.body.password, existUser.password);
    if(!isValid) return res.status(400).send({alert: "Password doesn't match."});

    var token = jwt.sign({user}, 'SWERA', {expiresIn: '5h'});
    res.send(token);
}