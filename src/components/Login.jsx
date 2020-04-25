import React, { Component } from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const GreenCheckbox = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: 'white',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export class Login extends Component {
    render() {
        return (
            <div className='home-page'>
                <Header/>
                <div className="d-flex justify-content-center">
                    <div className="frame-login px-5 d-flex flex-column justify-content-between align-items-center">
                         <h1>Event Management User Login</h1>
                         <TextField
                            fullWidth
                            variant="filled"
                            label='email'
                            size="small"
                            style={{backgroundColor:'white'}}
                            className='rounded mt-4'
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <AccountCircle fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                        /><TextField 
                            fullWidth
                            variant="filled"
                            label='Password'
                            size="small"
                            style={{backgroundColor:'white'}}
                            className='rounded mt-4'
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
                         <button className="btn btn-light">Login</button>
                         <p className="mt-3 text-white">Don't Have an Account? <Link className="text-white" to="/register"><u>Register</u></Link></p>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Login
