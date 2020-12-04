const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const JWT_SECRET = 'HDSHjhsiefoi1283798@#!##%$^&jhdkjfhksjdnfoiu#$%^&jbnsdkfjhsk'

module.exports = ((Loginvariable,User)=>{
    Loginvariable.post('/post/login',async(req,res)=>{
        // const newUserLogin = new User({
        //     email:req.body.email,
        //     password:req.body.password
        // })
        const { email , password } = req.body
        const user = await User.findOne({email}).lean()
        console.log(user);
        if(!user){
            res.json({msg:"invalid email or password !!"})
            return false
        }
        
        if(await bcrypt.compare(password, user.password)){

            const token = jwt.sign({
                id:user._id,
                email:user.email
            },JWT_SECRET)
            res.json({token:token,msg:"login succsessfull !!"})
        }else{
            res.json({msg:"invalid password"})
        }
        
        // var emailchecking=false
        // var passwordChecking = false

        // for (let user of userDetails){
        //     if(user.email === newUserLogin.email){
        //         var emailchecking=true;
        //         if (user.password === newUserLogin.password){
        //             var passwordChecking = true;
        //         }
        //     }
        
        // }
        // if (emailchecking){
        //     console.log(passwordChecking);    
        //     if(passwordChecking){
        //     res.json({msg:"successfully login"})
        //     }else{
        //     res.json({msg:"please check your password"})
        //     }
        // }else{
        //     res.json({msg:"your account does't exits please signup..."})
        // }
       
    })
}) 