import React, { Component,Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';


import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {FormHelperText} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {Grid} from '@material-ui/core';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';




export default class SinUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            firstName:'',
            surName:'',
            sinupEmailPhone:'',
            sinupPassWord:"",
            DateofBirth:'',
            Gender:'',


            redErrorforemail:Boolean(false),
            redErrorforName:Boolean(false),
            redErrorforSurname:Boolean(false),
            redErrorforpassword:Boolean(false),
            massegeErrorforemail:"",
            massegeErrorforName:"",
            massegeErrorforSurname:"",
            massegeErrorforpassword:"",
            GenderDisabled:true,
            errorMsgForbirth:'',
            signupMsgshow:false,
            validClose:false,
            signupmsgfromBackend:'',
        }
    }


 


    NameChange=(e)=>{
        if(e.target.value.length<=0){
            this.setState({
                massegeErrorforName:"don't leave this field",
                redErrorforName:Boolean(true),
            })
        }else{
            this.setState({
                massegeErrorforName:"",
                redErrorforName:Boolean(false),

            })

        }
        this.setState({
            firstName:e.target.value
        })
     }
     SurnameChange=(e)=>{
        if(e.target.value.length<=0){
            this.setState({
                massegeErrorforSurname:"don't leave this field",
                redErrorforSurname:Boolean(true)
            })
        }else{
            this.setState({
                massegeErrorforSurname:'',
                redErrorforSurname:Boolean(false)

            })

        }
        this.setState({
            surName:e.target.value
        })
     }
    setEmailhandler = (e)=>{
        
        if(e.target.value.length<=0){
            this.setState({
                massegeErrorforemail:"don't leave this field",
                redErrorforemail:Boolean(true)
            })
        }else{
            this.setState({
                massegeErrorforemail:'',
                redErrorforemail:Boolean(false)

            })

        }
        this.setState({
            sinupEmailPhone:e.target.value
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
            sinupPassWord:e.target.value
        })
    }
    handleDateofBirth = (e)=>{
        this.setState({
            DateofBirth:e.target.value,
            signupMsgshow:false,

        })
    }

    handleGender = (e)=>{
        // console.log(e.target.value,"otherrrrrrrrmaleeeeeee");
        this.setState({
            Gender:e.target.value,
            signupMsgshow:false,

        })
    }





    ValidDetails = ()=>{
        const {firstName,surName,sinupEmailPhone,sinupPassWord,Gender,DateofBirth}=this.state
        if (firstName.length<4 || surName.length<4){
            this.setState({
            redErrorforName:Boolean(true),
            redErrorforSurname:Boolean(true),
            massegeErrorforName:"your name must be 4 letters long",
            massegeErrorforSurname:"your name must be 4 letters long",
            })
            return false
        }
        if(!sinupEmailPhone.includes("@") || !sinupEmailPhone.includes('.')){
            this.setState({
                massegeErrorforemail:"please enter valid email",
                redErrorforemail:Boolean(true),

            })
            return false
        }
        if(sinupPassWord.length<8){
            this.setState({
                massegeErrorforpassword:"your password must be 8 letters long",
                redErrorforpassword:Boolean(true),

            })
            return false
        }
        if(DateofBirth.length<1){
            this.setState({
                errorMsgForbirth:"please enter valid date of birth or select gender",
            signupMsgshow:true,
            })
            console.log(DateofBirth,"dateeeeee");
            
            return false
        }
        if(Gender.length<1){
            this.setState({
                errorMsgForbirth:"please enter valid date of birth or select gender",
                signupMsgshow:true,

            })
            return false
        }
 
       return true 
    }
    SubmitDetails = ()=>{
        if(this.ValidDetails()){

            const firstName = this.state.firstName
            const lastName = this.state.surName
            const email = this.state.sinupEmailPhone
            const password = this.state.sinupPassWord
            const DateofBirth = this.state.DateofBirth
            const Gender = this.state.Gender
    
            const data={
                firstName,lastName,email,password,DateofBirth,Gender
            }

            axios.post("http://localhost:5000/all/users/post/signup",data)
                .then(responce=>{
                  this.setState({
                    signupmsgfromBackend:responce.data.msg
                  })
                })
                .catch(error=>{
                    console.log(error);
                    
                })            
        }
    }
    
    render() {
        const {sinupEmailPhone,sinupPassWord,massegeErrorforemail
            ,massegeErrorforpassword,redErrorforemail,redErrorforpassword} = this.state

            
        return (
            <Fragment>
                <Dialog 
                    open={this.props.OpenProps}
                    onClose={this.props.handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                     <DialogActions>
                    <Button autoFocus value={this.state.validClose} onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    </DialogActions>
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Sign Up     
                    {this.state.signupMsgshow ? <h4><i style={{color:"red"}}>{this.state.errorMsgForbirth}</i></h4>:''}
                    <p style={{color:"red"}}>{this.state.signupmsgfromBackend}</p>
                    </DialogTitle>
                    <DialogContent 
                        scroll="paper"
                    >
                    <Grid container alignItems="center" item xs={12}>
                        <Grid item xs={7}>
                    <FormControl variant="outlined" size="small" 
                    onChange={this.NameChange} onFocus={this.NameChange}   
                    >
                        <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                        <OutlinedInput id="outlined-Firstname" 
                        value={this.state.firstName} 
                        name="Name"
                        label="FirstName"
                        error={Boolean(this.state.redErrorforName)}
                        style={{backgroundColor:"#f5f6f7"}}
                        /> 
                        <FormHelperText id="component-error-text"  style={{color:'red'}} >{this.state.massegeErrorforName}</FormHelperText>
                        <br />
                    </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                    <FormControl variant="outlined" size="small" 
                    onChange={this.SurnameChange}  onFocus={this.SurnameChange}  
                    >
                        <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                        <OutlinedInput id="outlined-surname" 
                        value={this.state.Surname} 
                        name="Surname"
                        label="Last Name"
                        error={Boolean(this.state.redErrorforSurname)}
                        style={{backgroundColor:"#f5f6f7"}}
                        /> 
                        <FormHelperText id="component-error-text" style={{color:'red'}} >{this.state.massegeErrorforSurname}</FormHelperText>
                        <br />
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" size="small" 
                    onChange={this.setEmailhandler} onFocus={this.setEmailhandler}>
                    <InputLabel htmlFor="component-outlined">Email or phone number</InputLabel>
                    <OutlinedInput
                        id="component-outlined-email"
                        label="Email or phone number"
                        labelWidth={60}
                        value={sinupEmailPhone} 
                        error={Boolean(redErrorforemail)}
                        style={{backgroundColor:"#f5f6f7"}}
                    />
                    <FormHelperText id="component-error-text"  style={{color:'red'}} >{massegeErrorforemail}</FormHelperText>
                    <br />
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" size="small" 
                    onChange={this.setPasswordhandler} onFocus={this.setPasswordhandler} >
                    <InputLabel htmlFor="component-Password"> new password </InputLabel>
                    <OutlinedInput
                        id="component-new-Password"
                        label="new password"
                        type="password"
                        value={sinupPassWord}
                        error={Boolean(redErrorforpassword)}
                        style={{backgroundColor:"#f5f6f7"}}/> <br />
                        <FormHelperText id="component-error-text"  style={{color:'red'}} >{massegeErrorforpassword}</FormHelperText>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="outlined" size="small" style={{width:200}} onChange={this.handleDateofBirth}>
                    <InputLabel htmlFor="component-date"> Date of Birth </InputLabel>
                    <OutlinedInput
                        id="date"
                        label="Date of Birth "
                        type="number"
                        value={this.state.DateofBirth}
                        style={{backgroundColor:"#f5f6f7"}}
                    />
                    </FormControl>
                    </Grid>
                        <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name='gender' onChange={this.handleGender}>
                            <Grid>
                            <FormControlLabel  value='Male' control={<Radio />} label='Male' />
                            <FormControlLabel  value='Female' control={<Radio />} label='Female' />
                            <FormControlLabel  value='Others' control={<Radio />} label='Others' />
                            </Grid>
                        </RadioGroup>
                        </FormControl> 

                    </Grid>
                    </DialogContent>
                    <DialogActions style={{marginRight:270}}>
                    <Button onClick={this.SubmitDetails} 
                    variant="contained" style={{backgroundColor:"green",color:"white"}} >
                        Sign Up
                    </Button>
                    </DialogActions>
                   
                </Dialog>
                </Fragment>
        )
    }
}

