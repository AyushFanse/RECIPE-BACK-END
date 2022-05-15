const  User = require('../model/User');
const Joi = require('joi');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require("../middleWare/cloudinary");


///////////////////////////* Registration Part *////////////////////////////

exports.register = async (req, res, next) => {
    
    const schema = Joi.object({
        file: Joi.string(),
        cloudinary_id: Joi.string(),
        first_name: Joi.string().min(3).max(50).trim(true).required(),
        last_name: Joi.string().min(3).max(50).trim(true).required(),
        username: Joi.string().trim(true).min(4).max(25).required(),
        password: Joi.string().trim(true).required(),
        number: Joi.string().pattern(/^[0-9]+$/).required(),
        email: Joi.string().lowercase().min(6).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        address: Joi.string().min(3).max(200).required(),
        bio: Joi.string().min(3).max(200),
        saved: Joi.object({})
    })

    

    var {error} = schema.validate(req.body);
    if (error) return res.status(400).json({msg : error.details[0].message});

    var existUser = await User.findOne({"email": req.body.email}).exec();
    if(existUser) return res.status(400).json({msg : "Email already exists.", status : 400});

    var existUser = await User.findOne({"username": req.body.username}).exec();
    if(existUser) return res.status(400).json({msg : "Username already exists.", status : 400});

    var existUser = await User.findOne({"number": req.body.number}).exec();
    if(existUser) return res.status(400).json({msg : "Number already exists.", status : 400});



    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(req.body.password, salt);

    const bio = `Hey I'm New Here...`;
    
    
    const result = await cloudinary.uploader.upload(req.file.path,{
        upload_preset:"Recipe_Profile"
    });
    

    const user = new User({
        file: result.secure_url,
        cloudinary_id: result.public_id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        username:req.body.username,
        email:req.body.email,
        number:req.body.number,
        address:req.body.address,
        password:Password,
        saved:req.body.saved,
        bio:bio
    })
    try{
        let response = await user.save();
        res.status(201).json({msg : "You have successfully created your account..!", data : response});
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
    if(!existUser) return res.status(200).send({msg : "Email not reqistered", status : "error"});

    var user={};
    user.first_name = existUser.first_name;
    user.last_name = existUser.last_name;
    user.username = existUser.username;
    user.file = existUser.file;
    user._id = existUser._id;
    user.saved=existUser.saved;
    user.bio=existUser.bio;
    

    var isValid = await bcrypt.compare(req.body.password, existUser.password);
    if(!isValid) return res.status(200).send({msg : "Password doesn't match.", status : "error"});

    var token = jwt.sign({user}, 'SWERA', {expiresIn: '2h'});
    res.send({userToken : token, status : "success"});
}
