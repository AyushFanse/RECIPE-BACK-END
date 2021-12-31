const mongoose = require('mongoose');
const Schema = mongoose.Schema;


///////////////////////////* Schema for Profil_Pics *////////////////////////////

const profileSchema = new Schema({
    file:{
        type: 'object',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    }
}, {timestamps: true});


///////////////////////////* Exporting Part*////////////////////////////

module.exports = mongoose.model('Profil_Pics', profileSchema);