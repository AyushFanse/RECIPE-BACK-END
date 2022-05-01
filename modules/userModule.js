const User = require('../model/User');
const cloudinary = require("../middleWare/cloudinary");
const  bcrypt = require('bcrypt');


///////////////////////////* Get All Users From DataBase *////////////////////////////

exports.getUser = async(req, res, next)=>{
    try{
      await User.find();
        res.status(200);
    }catch(err){
      res.status(400).send(err);
  }
  };


///////////////////////////* Get User By ID From DataBase *////////////////////////////

exports.getUserById = async(req, res, next)=>{
  try{
    const post = await User.findById(req.params.userId);
      res.status(200).send(post);
  }catch(err){
      res.status(400).send(err);
}
};

  ///////////////////////////* Update User By Id *////////////////////////////

  exports.updateUser =async (req, res, next)=>{

    try{
      const user = await User.findById(req.params.userId);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        
        await cloudinary.uploader.destroy(user.cloudinary_id);

        result = await cloudinary.uploader.upload(req.file.path,{
          upload_preset:"Recipe_Profile"
      });
      }
      
      const data = {
        first_name: req.body.first_name || user.first_name,
        last_name: req.body.last_name || user.last_name,
        username: req.body.username || user.username,
        number: req.body.number || user.number,
        address: req.body.address || user.address,
        email: req.body.email || user.email,
        bio: req.body.bio || user.bio,
        file: result?.secure_url || user.file,
        cloudinary_id: result?.public_id || user.cloudinary_id
      };
      const response = await User.findByIdAndUpdate(req.params.userId, data, { new: true });
      res.status(200).json({msg : "You have successfully updated your account..!", status : "success"});
    }catch(err){
      res.status(400).send(err);
  }
  };


  ///////////////////////////* Update User By Id *////////////////////////////

  exports.updatePassword =async (req, res, next)=>{

    try{
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const response = await User.findByIdAndUpdate(req.params.userId,{
        password:newPassword
      },{new : true})
      res.status(200).json({msg : "You have successfully updated your account..!", status : "success"});
    }catch(err){
      res.status(400).send(err);
  }
  };

  ///////////////////////////* Delete User By Id *////////////////////////////

  exports.deleteUser =async (req, res, next) => {
    try{
      const post = await User.findById(req.params.userId);
        await cloudinary.uploader.destroy(post.cloudinary_id);
        const response = await User.findByIdAndRemove(req.params.userId);
      res.status(200).json({msg : "You have successfully deleted your account..!", status : "success"});
    }catch(err){
      res.status(400).send(err);
    }
  };

  
///////////////////////////* Save The Post *////////////////////////////

 exports.SavePost = async (req, res, next) => {
  try{
      await User.findByIdAndUpdate(req.params.userId,{            
          $push:{saved: req.body.saved}
          },{new : true})
      res.status(200).json({msg:"Post saved"});
  }catch(error){
      res.status(400).send(error.message);
  }
}



///////////////////////////* Delete the Saved The Post *////////////////////////////

 exports.DeleteSavedPost = async (req, res, next) => {
  try{
      let post = await User.findByIdAndUpdate(req.params.userId,{            
          $pull:{saved: req.body.saved}
          },{new : true})
      res.status(200).json({msg:"Post removed"});
  }catch(error){
      res.status(400).send(error.message);
  }
}
