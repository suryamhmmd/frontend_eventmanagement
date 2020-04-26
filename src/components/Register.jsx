import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Swal from 'sweetalert2'

import axios from '../config/axios'
import {connect} from 'react-redux'

const GreenCheckbox = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: 'white',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export class Register extends Component {

    state={
        formRegister:{
            nama:'',
            email:'',
            password:'',
            confirmPassword:'',
        },
        status:false
    }

    handleChange = (event)=>{
        let {formRegister} = this.state
        formRegister[event.target.name] = event.target.value
        this.setState({
            formRegister
        })
    }

    login = ()=>{
        let {nama, email, password} = this.state.formRegister

        if(!nama || !email || !password){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }

        let data = {nama, email, password}
        
        axios.post(`/user/register`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registration Success',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({status:true})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    renderTextField = (name, label, type)=>{
        return(
            <TextField 
                style={{backgroundColor:'white'}} 
                fullWidth 
                className="rounded mt-3"
                name={name}
                size="small" 
                label={label} 
                type={type}
                variant="filled" 
                onChange={this.handleChange}
            />
        )
    }

    render() {

        if(!this.props.login){
            if(this.state.status){
                return <Redirect to="/"/>
            }
    
            return (
                <div className="home-page">
                    <div className="d-flex justify-content-center">
                        <div className="frame-register d-flex flex-column alignite px-5 align-items-center">
                            <h1 className="text-center">Event Management User Register</h1>
                            {this.renderTextField('nama', 'Full Name')}
                            {this.renderTextField('email', 'Email')}
                            {this.renderTextField('password', 'Password', 'password')}
    
                            <TextField 
                                style={{backgroundColor:'white'}} 
                                fullWidth 
                                className="rounded mt-3"
                                name="confirmPassword"
                                size="small" 
                                label="Confirm Password"
                                type="password"
                                variant="filled" 
                                onChange={this.handleChange}
                                error={this.state.formRegister.password !== this.state.formRegister.confirmPassword ? true : false}
                            />
    
                            <FormControlLabel
                                control={<GreenCheckbox name="infoExpectStrengths" value="accept"/>}
                                label="I accept terms of use" className="align-self-start" style={{color:'white'}}
                            />
                            <button onClick={this.login} disabled={this.state.formRegister.password !== this.state.formRegister.confirmPassword ? true : false} className="btn btn-light">Sign Up</button>
                            <p className="mt-3 text-white">have a account? <Link className="text-white" to="/login"><u>Sign In</u></Link></p>
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

export default connect(mapStateToProps)(Register)
