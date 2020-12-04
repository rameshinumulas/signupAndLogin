const express = require('express');
const app = express();
const router = express.Router(); 
const cors = require('cors')
const fs = require('fs')
const mongoose = require('mongoose');
const User = require('./modal/loginSchema')



mongoose.connect('mongodb://localhost:27017/jwt',
{useNewUrlParser:true})
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const mongoConnect = mongoose.connection

mongoConnect.on('open',()=>{
    console.log('mongo db connected');
})



app.use(express.json());
app.use(cors());


let userDetails = JSON.parse(fs.readFileSync("./indexJson.json"))


app.use("/all/users",router)
require('./loginpage')(router,User);
require('./signUppage')(router,User);

app.listen(5000,(err)=>{
    if(err)throw err
    console.log("post is working properly")
})