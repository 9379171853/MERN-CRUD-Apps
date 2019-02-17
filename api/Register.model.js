const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users= new Schema({
    username:{
        type: String
    },
    emailid:{
        type: String
    },
    mobileno:{
        type: String
    },
    password:{
        type: String
    }},{
        collection: 'user'
    
});

module.exports = mongoose.model('Users',Users)

