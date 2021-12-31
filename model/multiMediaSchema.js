const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//-------------------------------* Schema for Multi_Media *------------------------------------//


const multiMediaSchema = new Schema({ 
    title: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    userId: {
        type: 'string',
        required: true
    },
    likes: [Object],
    comments: [Object],
    recipe: {
        type: 'string',
        required: true
    },
    time: {
        type: 'string',
        required: true
    },
    files:[Object]
}, {timestamps: true});


///////////////////////////* Exporting Part*////////////////////////////

module.exports = mongoose.model('Multi_Media', multiMediaSchema)

// {
//     username: {
//         type: 'string',
//         required: true
//     },
//     messId: {
//         type: 'string',
//         required: true
//     },
//     message: {
//         type: 'string',
//         required: true
//     },
//     messTime: {
//         type: 'string',
//         required: true
//     }
// }