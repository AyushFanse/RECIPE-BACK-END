'use strict';
const profilePic = require('../model/profilePicSchema');
const multiMedia = require('../model/multiMediaSchema');

///////////////////////////* Single File Upload *////////////////////////////

const profilePicUpload = async (req, res, next) => {
    try{
        const fileData ={
            filename: req.file.originalname,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            filesize: fileSizeFormatter(req.file.size,2)
        }
        const file = new profilePic({
            username:  req.body.username,
            email:req.body.email,
            file: fileData
        });
        await file.save();
        res.status(201).send('File has beed uploaded...!');
    }catch(error){
        res.status(400).send(error.message);
    }
}


///////////////////////////* Get All ProfilePic From DataBase *////////////////////////////

const getAllProfilePics = async (req, res, next) => {
    try{
        const pics = await profilePic.find();
        res.status(200).send(pics);
    }catch(error){
        res.status(400).send(error.message);
    }
}


///////////////////////////* Patch ProfilePic From DataBase *////////////////////////////

const updateProfilePic = async (req, res, next) => {
    try{
        const pic = await profilePic.findByIdAndUpdate(req.params.id,{
            filename: req.file.originalname,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            filesize: fileSizeFormatter(req.file.size,2)
        });
        res.status(200).send(pic);
    }catch(error){
        res.status(400).send(error.message);
    }
   
    
}


///////////////////////////* Delete ProfilePic From DataBase *////////////////////////////

const deleteProfilePic = async (req, res, next) => {
    try{
        const pic = await profilePic.findByIdAndRemove(req.params.id);
        res.status(200).send(pic);
    }catch(error){
        res.status(400).send(error.message);
    }
}


///////////////////////////* Multipal File Upload *////////////////////////////

const multipleMediaUpload = async (req, res,next) => {
    try{
        let filesArray = [];
        req.files.forEach(element=>{
        const file = {
            filename: element.originalname,
            filepath: element.path,
            filetype: element.mimetype,
            filesize: fileSizeFormatter(element.size,2)
        }
        filesArray.push(file);
    });
        const multipleFiles = new multiMedia({
            title: req.body.title,
            files: filesArray,
            username: req.body.username,
            recipe: req.body.recipe,
            userId: req.body.userId,
            likes: req.body.likes,
            comments: req.body.comments,
            time: req.body.time
        });
        await multipleFiles.save();
        console.log("Multipul uploaded, All set....");
        res.status(201).send('File has beed uploaded...!');
    }catch(error){
        res.status(400).send(error.message);
    }
}


///////////////////////////* Get All Multi_Media From DataBase *////////////////////////////

const getAllMultiMedias = async (req, res, next) => {
    try{
        const media = await multiMedia.find();
        res.status(200).send(media);
    }catch(error){
        res.status(400).json({ msg: 'Fill Title, Images and Recipe all are is required' }).send(error.message);
    }
}


///////////////////////////* Patch Multi_Media From DataBase *////////////////////////////

const updateMultiMedia = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element=>{
        const file = {
            filename: element.originalname,
            filepath: element.path,
            filetype: element.mimetype,
            filesize: fileSizeFormatter(element.size,2)
        }
        filesArray.push(file);
        });
        var media = await multiMedia.findByIdAndUpdate(req.params.id,{
            recipe: req.body.recipe,
            userId: req.body.userId,
            files: filesArray,
            likes: req.body.likes,
            comments: req.body.comments
            },{new : true})
        res.status(200).send(media);
    }catch(error){
        res.status(400).send(error.message);
    }
}


///////////////////////////* Patch Likes of Multi_Media From DataBase *////////////////////////////

const LikeMultiMedia = async (req, res, next) => {
    try{
        var like = await multiMedia.findByIdAndUpdate(req.params.id,{            
            $push:{likes: req.body.likes}
            },{new : true})
        res.status(200).send(like);
    }catch(error){
        res.status(400).send(error.message);
    }
}



///////////////////////////* Patch Unlikes of Multi_Media From DataBase *////////////////////////////

const UnlikeMultiMedia = async (req, res, next) => {
    try{
        var unlike = await multiMedia.findByIdAndUpdate(req.params.id,{            
            $pull:{likes: req.body.likes}
            },{new : true})
        res.status(200).send(unlike);
    }catch(error){
        res.status(400).send(error.message);
    }
}


///////////////////////////* Patch Comments of Multi_Media From DataBase *////////////////////////////

const commentsMultiMedia = async (req, res, next) => {
    try{
        const message = {
                username: req.body.username,
                messId: req.body.messId,
                message: req.body.message,
                messTime: req.body.messTime
        }
        var comment = await multiMedia.findByIdAndUpdate(req.params.id,{            
            $push:{
                comments : message
            }
            },{new : true})
        res.status(200).send(comment);
    }catch(error){
        res.status(400).send(error.message);
    }
}

///////////////////////////* Patch Comments of Multi_Media From DataBase *////////////////////////////

const deleteCommentsMultiMedia = async (req, res, next) => {
    try{
        var comment = await multiMedia.findByIdAndUpdate(req.params.id,{            
            $pull:{
                username: req.body.username,
                messId: req.body.userId,
                message: req.body.message,
                messTime: req.body.messTime
            }
            },{new : true})
        res.status(200).send(comment);
    }catch(error){
        res.status(400).send(error.message);
    }
}


///////////////////////////* Delete Multi_Media From DataBase *////////////////////////////


const deleteMultiMedia = async (req, res, next) => {
    try{
        const media = await multiMedia.findByIdAndRemove(req.params.id);
        res.status(200).send(media);
    }catch(error){
        res.status(400).send(error.message);
    }
}



///////////////////////////* File Formatter *////////////////////////////


const fileSizeFormatter = (bytes, decimal) =>{
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes','KB','MB','GB','TB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, index)).toFixed(dm))+ sizes[index];
}




///////////////////////////* Exporting Part *////////////////////////////


module.exports= {
                    profilePicUpload ,
                    getAllProfilePics,
                    updateProfilePic,
                    deleteProfilePic,
                    multipleMediaUpload,
                    updateMultiMedia,
                    getAllMultiMedias,
                    deleteMultiMedia,
                    LikeMultiMedia,
                    UnlikeMultiMedia,
                    commentsMultiMedia,
                    deleteCommentsMultiMedia
                }