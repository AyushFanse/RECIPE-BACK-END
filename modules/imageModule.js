const multiMedia = require('../model/multiMediaSchema');
const cloudinary = require("../middleWare/cloudinary");

///////////////////////////* Multipal File Upload *////////////////////////////

const multipleMediaUpload = async (req, res,next) => {
    try{
        let filesArray = [];
        for (let i = 0; i < req.files.length; i++) {
            const locaFilePath = req.files[i].path;
            const result = await cloudinary.uploader.upload(locaFilePath,{upload_preset:"Recipe_Media"});
            const file = {
                            filepath: result.secure_url,
                            cloudinary_id: result.public_id,
                            filesize: fileSizeFormatter(req.files[i].size,2)
                        }
            filesArray.push(file);
            }
        const multipleFiles = new multiMedia({
            title: req.body.title,
            files: filesArray,
            username: req.body.username,
            recipe: req.body.recipe,
            userId: req.body.userId
        });
        await multipleFiles.save();
        res.status(201).json({msg:'File has beed uploaded...!'});
    }catch(err){
        console.log(err)
        res.status(400).send(err);
    }
}


///////////////////////////* Get All Multi_Media From DataBase *////////////////////////////

const getAllMultiMedias = async (req, res, next) => {
    try{
        const media = await multiMedia.find();
        res.status(200).send(media);
    }catch(err){
        res.status(400).json({ msg: 'Fill Title, Images and Recipe all are is required' }).send(err);
    }
}


///////////////////////////* Patch Multi_Media From DataBase *////////////////////////////

const updateMultiMedia = async (req, res, next) => {
    
    try{
        let media = await multiMedia.findByIdAndUpdate(req.params.id)
        let filesArray = [];

        if(req.files){
        for (let i = 0; i < req.files.length; i++) {
            const locaFilePath = req.files[i].cloudinary_id;

            await cloudinary.uploader.destroy(locaFilePath.cloudinary_id,{
                upload_preset:"Recipe_Media"
            });   
        }

        for (let i = 0; i < req.files.length; i++) {
            const locaFilePath = req.files[i].path;
            const result = await cloudinary.uploader.upload(locaFilePath,{
                upload_preset:"Recipe_Media"
            });
            const file = {
                            filepath: result.secure_url,
                            cloudinary_id: result.public_id,
                            filesize: fileSizeFormatter(req.files[i].size,2)
                        }
            filesArray.push(file);
            }
        }

        await multiMedia.findByIdAndUpdate(req.params.id,{
            recipe: req.body.recipe || media.first_name,
            files: filesArray,
            title: req.body.title || media.title,      
            time:new Date()
            },{new : true})
        res.status(200).json({msg:"You have successfully updated your post..!"});
    }catch(err){
        res.status(400).send(err);
    }
}


///////////////////////////* Patch Likes of Multi_Media From DataBase *////////////////////////////

const LikeMultiMedia = async (req, res, next) => {
    try{
        await multiMedia.findByIdAndUpdate(req.params.id,{            
            $push:{likes: req.body.likes}
            },{new : true})
        res.status(200);
    }catch(err){
        res.status(400).send(err);
    }
}



///////////////////////////* Patch Unlikes of Multi_Media From DataBase *////////////////////////////

const UnlikeMultiMedia = async (req, res, next) => {
    try{
        await multiMedia.findByIdAndUpdate(req.params.id,{            
            $pull:{likes: req.body.likes}
            },{new : true})
        res.status(200);
    }catch(error){
        res.status(400).send(err);
    }
}


///////////////////////////* Patch Comments of Multi_Media From DataBase *////////////////////////////

const commentsMultiMedia = async (req, res, next) => {
    try{
        const message = {
                username: req.body.username,
                messId: req.body.messId,
                message: req.body.message,
                messTime: new Date()
        }
        await multiMedia.findByIdAndUpdate(req.params.id,{            
            $push:{
                comments : message
            }
            },{new : true})
        res.status(200);
    }catch(err){
        res.status(400).send(err);
    }
}

///////////////////////////* Patch Comments of Multi_Media From DataBase *////////////////////////////

const deleteCommentsMultiMedia = async (req, res, next) => {
    try{
        await multiMedia.findByIdAndUpdate(req.params.id,{            
            $pull:{
                username: req.body.username,
                messId: req.body.userId,
                message: req.body.message,
                messTime: req.body.messTime
            }
            },{new : true})
        res.status(200);
    }catch(err){
        res.status(400).send(err);
    }
}


///////////////////////////* Delete Multi_Media From DataBase *////////////////////////////


const deleteMultiMedia = async (req, res, next) => {
    try{
        await multiMedia.findById(req.params.id);
        if(req.files){
            for (let i = 0; i < req.files.length; i++) {
                const locaFilePath = req.files[i].cloudinary_id;
    
                await cloudinary.uploader.destroy(locaFilePath.cloudinary_id,{
                    upload_preset:"Recipe_Media"
                });   
            }
        }
        await multiMedia.findByIdAndRemove(req.params.id);
        res.status(200);
    }catch(err){
        res.status(400).send(err);
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
                    multipleMediaUpload,
                    updateMultiMedia,
                    getAllMultiMedias,
                    deleteMultiMedia,
                    LikeMultiMedia,
                    UnlikeMultiMedia,
                    commentsMultiMedia,
                    deleteCommentsMultiMedia
                }