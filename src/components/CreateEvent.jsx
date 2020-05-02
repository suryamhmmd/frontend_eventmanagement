import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from '../config/axios';
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom';

export class CreateEvent extends Component {

    state = {
        formEvent:{
            nama:'',
            penyelenggara:'',
            tempat: new Date(),
            tanggal:''
        },
        redirect: false
    }

    submitEvent = ()=>{
        let{nama, penyelenggara, tempat, tanggal} = this.state.formEvent

        if(!nama || !penyelenggara || !tempat || !tanggal){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }

        let data = {nama, penyelenggara, tempat, tanggal}
        console.log(data)
        axios.post(`/event`, data)
        .then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Event Created',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({redirect:true})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChange = (event)=>{
        let {formEvent} = this.state
        formEvent[event.target.name] = event.target.value
        this.setState({formEvent})
    }

    renderTextField = (name, label, type, shrink)=>{
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
                InputLabelProps={shrink}
            />
        )
    }

    render() {
        if(!this.state.redirect){
            return (
                <div className='home-page'>
                    <div className="d-flex justify-content-center">
                        <div className="frame-event d-flex flex-column p-5 align-items-center">
                            <h1 className="text-center text-white">Basic Details</h1>
                            <h2 className="text-center text-white">Name, Detail Event</h2>
                            {this.renderTextField('nama', 'Event Name','', null)}
                            {this.renderTextField('penyelenggara', 'Organizer', '', null)}
                            {this.renderTextField('tanggal', 'Date of Event', 'date', {shrink: true,})}
                            {this.renderTextField('tempat', 'Location','', null)}
                            <div>
                                <Link to="/welcome_page">
                                    <button className="btn btn-light mt-3 mr-5">Cancel</button>
                                </Link>
                                <button onClick={this.submitEvent} className="btn btn-light mt-3 ">Create</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }else{
            return <Redirect to="/welcome_page"/>
        }
    }
}

export default CreateEvent
