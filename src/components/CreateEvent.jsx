import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

export class CreateEvent extends Component {
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
            <div className='home-page'>
                <div className="d-flex justify-content-center">
                    <div className="frame-event d-flex flex-column alignite px-5 align-items-center">
                    <h1 className="text-center text-white">Basic Details</h1>
                    <h2 className="text-center text-white">Name, Detail Event</h2>
                    {this.renderTextField('nama', 'Event Name')}
                    {this.renderTextField('penyelenggara', 'Organizer')}
                    {this.renderTextField('tanggal', 'Date of Event', 'date')}
                    {this.renderTextField('tempat', 'Location')}
                    <div>
                    <button className="btn btn-light mt-3 mr-5">Cancel</button>
                    <button className="btn btn-light mt-3 ">Create</button>
                    
                    </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default CreateEvent
