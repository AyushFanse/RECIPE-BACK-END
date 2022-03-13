const mongoose = require('mongoose');
const Schema = mongoose.Schema;


///////////////////////////* Schema for Profil_Pics *////////////////////////////

const profileSchema = new Schema({
    file:{
        type: String,
        required: true
    },
    cloudinary_id:  {
        type: String,
        required: true
    },
    filesize:  {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
}, {timestamps: true});


///////////////////////////* Exporting Part*////////////////////////////

module.exports = mongoose.model('Profil_Pics', profileSchema);