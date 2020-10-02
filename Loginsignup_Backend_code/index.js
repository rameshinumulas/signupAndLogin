const express = require('express');
const app = express();
const router = express.Router(); 
const cors = require('cors')
const fs = require('fs')
app.use(express.json());
app.use(cors());


let userDetails = JSON.parse(fs.readFileSync("./indexJson.json"))


app.use("/all/users",router)
require('./loginpage')(router,userDetails);
require('./signUppage')(router,userDetails);

app.listen(5000,(err)=>{
    if(err)throw err
    console.log("post is working properly")
})