const fs = require('fs')

module.exports=((signupage,userDetails)=>{
    signupage.post('/post/signup',(req,res)=>{
        const newUser = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            Gender:req.body.Gender,
            DateofBirth:req.body.DateofBirth
           
        }
        // if(!newUser.firstName || !newUser.email || !newUser.password || 
        //     !newUser.lastName || !newUser.Gender || newUser.DateofBirth){
        //     res.json({msg:"please provide all required details"});
        //     return false;
        // }
        console.log(newUser);
        
        const exitMsg = userDetails.some(each=>(each.email === req.body.email && each.password === req.body.password))
        if (exitMsg){
            res.json({msg:" your account alredy  exits"})
        }else{
            userDetails.push(newUser);
            res.json({msg:"succuessfully your account created"})
            fs.writeFileSync("./indexJson.json",JSON.stringify(userDetails,null,4),null)
            console.log("details updated");
        }
    })
})