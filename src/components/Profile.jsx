import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import TextField from '@material-ui/core/TextField';


export class Profile extends Component {
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
        return (
                <div className="home-page">
                    <div className="d-flex justify-content-center">
                        <div className="frame-profile d-flex flex-column px-5 align-items-center">
                            <h1 className="text-center mt-3 text-white">My Profile</h1>
                            <Avatar style={{width:'100px', height:'100px', paddingTop:'3px'}}><PermIdentityIcon style={{width:'60px', height:'60px'}}></PermIdentityIcon></Avatar>
                            <p className="text-white pt-3">Change Profile Picture</p> 
                            {this.renderTextField('nama', 'Full Name')}
                            {this.renderTextField('email', 'Email')}
                            {this.renderTextField('tanggal_lahir', 'Date of Birth','Date')}
                            {this.renderTextField('jabatan', 'Jabatan')}
                            <div>
                            <button onClick={this.onLoginClick} className="btn btn-light mt-3 mr-4">Back</button>
                            <button onClick={this.onLoginClick} className="btn btn-light mt-3">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Profile
