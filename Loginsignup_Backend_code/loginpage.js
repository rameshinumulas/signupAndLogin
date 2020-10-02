module.exports = ((Loginvariable,userDetails)=>{
    Loginvariable.post('/post/login',(req,res)=>{
        const newUserLogin = {
            email:req.body.email,
            password:req.body.password
        }
        var emailchecking=false
        var passwordChecking = false

        for (let user of userDetails){
            if(user.email === newUserLogin.email){
                var emailchecking=true;
                if (user.password === newUserLogin.password){
                    var passwordChecking = true;
                }
            }
        
        }
        if (emailchecking){
            console.log(passwordChecking);    
            if(passwordChecking){
            res.json({msg:"successfully login"})
            }else{
            res.json({msg:"please check your password"})
            }
        }else{
            res.json({msg:"your account does't exits please signup..."})
        }
       
    })
}) 