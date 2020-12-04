const bcrypt = require('bcryptjs')

module.exports=((signupage,User)=>{
    signupage.post('/post/signup',async(req,res)=>{
        console.log(req.body);
        const Haspassword = await bcrypt.hash(req.body.password,10)
        console.log(Haspassword);
        const newUser = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:Haspassword,
            Gender:req.body.Gender,
            DateofBirth:req.body.DateofBirth   
        })
       
        // if(!newUser.firstName || !newUser.email || !newUser.password || 
        //     !newUser.lastName || !newUser.Gender || !newUser.DateofBirth){
        //     res.json({msg:"please provide all required details"});
        //     return false;
        // }
        // console.log(newUser);
        const newUserCheck = await User.find({
            firstName:newUser.firstName,
            lastName:newUser.lastName,email:newUser.email,password:newUser.password})
           
        if(newUserCheck[0]){
            res.json({msg:"this account alreday exits"})
            return false
        }
        try{
            const createAccount = await newUser.save()
            res.json({msg:"Account created successfully !!!"})
        }
        catch(err){
            console.log(err.message);
            res.json({msg:"hello...this details already exits"})
        }
        
    })
})