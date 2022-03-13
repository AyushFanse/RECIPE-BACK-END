const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//-------------------------------* Schema for Multi_Media *------------------------------------//


const multiMediaSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: [Object],
    comments: [Object],
    recipe: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date()
    },
    files:[{
                filepath: {
                    type: String,
                    required: true
                },
                cloudinary_id: {
                    type: String,
                    required: true
                },
                filesize: {
                    type: String,
                    required: true
                }
            }]
            
}, {timestamps: true});


///////////////////////////* Exporting Part*////////////////////////////

module.exports = mongoose.model('Multi_Media', multiMediaSchema)