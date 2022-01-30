const mongoose = require('mongoose');



//////----------------------* Mongoose Connection *----------------------//////

exports.connect = () => {
    try{
        mongoose.connect('mongodb+srv://RECIPES:RECIPES@recipes.laned.mongodb.net/RECIPES?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
    } catch(err) {
        alert('Error connecting to Server')
        process.exit();
    }
}

// `//mongodb+srv://Recipe_CMS:Recipe_CMS@recipe-cms.3i7cy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
