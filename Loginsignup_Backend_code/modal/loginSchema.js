const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    firstName:{type:String,require:true,unique:true},
    lastName:{type:String,require:true,unique:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    DateofBirth:{type:String,require:true},
    Gender:{type:String,require:true}
})

const model = mongoose.model('login',loginSchema)

module.exports = model