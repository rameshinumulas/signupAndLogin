import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';

import {Grid} from '@material-ui/core';
import {Card} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import {CardActions} from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {FormHelperText} from '@material-ui/core';



import SinUp from './SinUp';



export default class LoginPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            emailPhone:'',
            passWord:"",
            redErrorforemail:Boolean(false),
            redErrorforpassword:Boolean(false),
            massegeErrorforemail:"",
            massegeErrorforpassword:"",
            createAccountButton:false,
            isDialogueOpen:false,   
            loginmsg:'',
            loginErrorMassage:'',
            isloginMsgshow:false

        }
    }
  
    setEmailhandler = (e)=>{
        
            if(e.target.value.length<=0){
                this.setState({
                    massegeErrorforemail:"don't leave this field",
                    redErrorforemail:Boolean(true),
                })
            }else{
                this.setState({
                    massegeErrorforemail:'',
                    redErrorforemail:Boolean(false)
    
                })
    
            }
            this.setState({
                emailPhone:e.target.value,
                isloginMsgshow:false
            })
    }
    setPasswordhandler = (e)=>{
        if(e.target.value.length<=0){
            this.setState({
                massegeErrorforpassword:"don't leave this field",
                redErrorforpassword:Boolean(true)
            })
        }else{
            this.setState({
                massegeErrorforpassword:'',
                redErrorforpassword:Boolean(false)
            })

        }
        this.setState({
            passWord:e.target.value,
            isloginMsgshow:false

        })
    }
    Valid = ()=>{
        const {emailPhone,passWord} = this.state
        if(!emailPhone.includes("@") || !emailPhone.includes('.')){
            this.setState({
                massegeErrorforemail:"please enter valid email",
                redErrorforemail:Boolean(true),

            })
            return false
        }
        if(passWord.length<4){
            this.setState({
                
                massegeErrorforpassword:"please enter strong password min(8 letters)",
                redErrorforpassword:Boolean(true),

            })
            return false
        }
        return true
    }
    subMitLogin = () =>{
        if(this.Valid()){
            const email = this.state.emailPhone;
            const password = this.state.passWord;
            
            const data = {
                email,password
            }
                axios.post("http://localhost:5000/all/users/post/login",data)
                .then(responce=>{
                    console.log(responce,"getting data")  
                    this.setState({loginmsg:responce.data.msg})
                })
                .catch(error=>{
                    console.log(error);
                    
                })
            }
    }
    CloseDialogue = ()=>{
        this.setState({
            createAccountButton:false,
            isDialogueOpen:false,
        })
    }
    CheckingDialogue =()=>{   
    this.setState({
        createAccountButton:true,
        isDialogueOpen:true
        })

    }

    render(props) {        
        const {emailPhone,passWord,massegeErrorforemail
            ,massegeErrorforpassword,redErrorforemail,redErrorforpassword} = this.state
        return (
            <div className="login">
                <div className="card2">
                <Grid container justify="center">
                <Grid item xs={5} style={{marginTop:140}}>
                <h1 style={{color:"rgb(0,128,255)",fontSize:"50px"}}>Social media</h1>
                <p style={{fontFamily:"Arial",fontSize:26}}>it helps you to connect and share your ideas to the people in world wide.</p>
                </Grid>
                <Grid item xs={3} style={{marginTop:140}}>
                {this.state.isloginMsgshow ? <i style={{color:"red"}}>{this.state.loginErrorMassage}</i>:''}
                    <Card className="card1" style={{borderRadius:"10px",boxShadow:"10px 10px 3px #aaaa"}}>
                    <p style={{color:"red"}}>{this.state.loginmsg}</p>
                    <CardContent>
                    <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="component-outlined">Email or phone number</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Email or phone number"
                        value={emailPhone}
                        onChange={this.setEmailhandler}
                        labelWidth={60}
                        error={Boolean(redErrorforemail)}
                        onFocus={this.setEmailhandler}

                    />
                        <FormHelperText id="component-error-text"  style={{color:'red'}} >{massegeErrorforemail}</FormHelperText>
                     <br />
                </FormControl>
                
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="component-Password"> Password </InputLabel>
                    <OutlinedInput
                        id="component-Password"
                        label="Password"
                        type="password"
                        value={passWord}
                        onChange={this.setPasswordhandler}
                        error={Boolean(redErrorforpassword)}
                        onFocus={this.setPasswordhandler}
                    /> 
                        <FormHelperText id="component-error-text"  style={{color:'red'}} >{massegeErrorforpassword}</FormHelperText>
                </FormControl>

                </CardContent>
                <CardActions>
                <Button fullWidth variant="contained" size="large" 
                 style={{backgroundColor:"#1877f2",color:"white",height:50,fontSize:"20px",fontFamily:"Helvetica,Arial,sans-serif"}}
                 onClick = {this.subMitLogin}>
                    Log in
                </Button><br />
                

                </CardActions>
                <CardActions>
                    <a href="#"  style={{textDecoration:"none",marginLeft:100}}>Forgotten account?</a>
                </CardActions>
                <div className="line">
                <hr />

                </div>
                <CardActions>
                <Button fullWidth variant="contained" size="large" color="primary"
                 style={{marginLeft:80,marginRight:80,height:50,backgroundColor:"#42B72A",fontSize:"15px",fontFamily:"Helvetica,Arial,sans-serif"}}
                 onClick={this.CheckingDialogue}>
                Create New Account
                </Button>
                </CardActions>
                </Card>
                
                {this.state.createAccountButton ? <SinUp handleClose = {this.CloseDialogue}  OpenProps={this.state.isDialogueOpen} />:null}

                </Grid>
                </Grid>
              
                </div>
            </div>
        )
    }
}
