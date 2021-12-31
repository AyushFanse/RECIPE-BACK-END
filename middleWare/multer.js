'use strict';
const multer = require('multer');


///////////////////////////* Multer Formatter *////////////////////////////

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads');    
    },
    filename: (req, file, cb) =>{
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, 'PIC'+ '-' + Date.now() + ext);
    }
});


///////////////////////////* Filtering Process *////////////////////////////

const filefilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}



const upload = multer({storage: storage, fileFilter: filefilter});
module.exports = {upload};
