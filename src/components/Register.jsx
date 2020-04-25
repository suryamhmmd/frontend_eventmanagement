import React, { Component } from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
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

export class Register extends Component {
    render() {
        return (
            <div className="home-page">
                <Header/>
                <div className="d-flex justify-content-center">
                    <div className="frame-register d-flex flex-column alignite px-5 align-items-center">
                        <h1 className="text-center">Event Management User Register</h1>
                        <TextField style={{backgroundColor:'white'}} fullWidth className="rounded mt-3" size="small" label="Full Name" variant="filled" />
                        <TextField style={{backgroundColor:'white'}} fullWidth className="rounded mt-3" size="small" label="Email" variant="filled" />
                        <TextField style={{backgroundColor:'white'}} fullWidth className="rounded mt-3" size="small" label="Password" variant="filled" />
                        <TextField style={{backgroundColor:'white'}} fullWidth className="rounded mt-3" size="small" label="Confirm Password" variant="filled" />
                        <FormControlLabel
                            control={<GreenCheckbox name="infoExpectStrengths" value="accept"/>}
                            label="I accept terms of use" className="align-self-start" style={{color:'white'}}
                        />
                        <button className="btn btn-light">Sign Up</button>
                        <p className="mt-3 text-white">have a account? <Link className="text-white" to="/login"><u>Sign In</u></Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
