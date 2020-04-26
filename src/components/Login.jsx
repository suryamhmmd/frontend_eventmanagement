import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Swal from 'sweetalert2'
import {logIn} from '../actions'
import {connect} from 'react-redux'
import axios from '../config/axios';

const GreenCheckbox = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: 'white',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

class Login extends Component {

    state = {
        formLogin :{
            email:'',
            password:''
        }
    }


    handleChange  =(event)=>{
        let {formLogin} = this.state
        formLogin[event.target.name] = event.target.value
        this.setState({
            formLogin
        })
    }

    onLoginClick = ()=>{
        let {email, password} = this.state.formLogin

        if(!email || !password){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }

        let data = {email, password}
        // console.log(data)
        axios.post(`/user/login`, data)
        .then(res=>{
            if(res.data.error){
                Swal.fire({
                    icon:'error',
                    title:res.data.error,
                })
                return
            }
            localStorage.setItem('userData', JSON.stringify(res.data))
            this.props.logIn(res.data)

        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                icon:'error',
                title:'Network Error',
            })
        })
    }

    render() {
        if(!this.props.login){
            return (
                <div className='home-page'>
                    <div className="d-flex justify-content-center">
                        <div className="frame-login px-5 d-flex flex-column justify-content-between align-items-center">
                            <h1>Event Management User Login</h1>
                            <TextField
                                fullWidth
                                variant="filled"
                                label='email'
                                name="email"
                                size="small"
                                style={{backgroundColor:'white'}}
                                className='rounded mt-4'
                                onChange={this.handleChange}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            <AccountCircle fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField 
                                fullWidth
                                variant="filled"
                                label='Password'
                                name="password"
                                type="password"
                                size="small"
                                style={{backgroundColor:'white'}}
                                className='rounded mt-4'
                                onChange={this.handleChange}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <div className='d-flex flex-row'>
                            <FormControlLabel
                                control={<GreenCheckbox name="infoExpectStrengths" value="accept"/>}
                                label="Remember-me" className="align-self-start" style={{color:'white'}}
                            />
                            <p className='text-white pt-2'>Forgot Password?</p>
                            </div>
                            <button onClick={this.onLoginClick} className="btn btn-light">Login</button>
                            <p className="mt-3 text-white">Don't Have an Account? <Link className="text-white" to="/register"><u>Register</u></Link></p>
                        </div>
                    </div>
                </div>
                
            )
        }else{
            return <Redirect to="/welcome_page"/>
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        login: state.auth.data
    }
}

export default connect(mapStateToProps, {logIn})(Login)
