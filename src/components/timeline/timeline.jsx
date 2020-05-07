import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'
import Swal from 'sweetalert2'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Sidebar from '../Sidebar'

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Paper } from '@material-ui/core';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export class timeline extends Component {

    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
        modal: false,
        id_agenda:'',
        events: null,
        status:'',
        formInput:{
            title:'',
            start:'',
            end:'',
        }
        
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
        this.getRecap(dataEvent)
    }

    getRecap = (dataEvent)=>{
        axios.get(`/agenda/${dataEvent.idEvent}`)
        .then(res=>{
            let data = res.data.map(val=>{
                return{
                    id_agenda:val.id_agenda,
                    id_user:val.id_user,
                    id_event:val.id_event,
                    start: new Date(val.start),
                    end: new Date(val.end),
                    title:val.title
                }
                
            })
            this.setState({events:data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleAdd = ()=>{
        this.setState({modal:!this.state.modal, status:'add'})
    }

    toggleEdit = (event)=>{
        axios.get(`/edit_agenda/${event.id_agenda}`)
        .then(res=>{
            let{formInput} = this.state
            formInput['title'] = res.data[0].title
            formInput['start'] =  moment(res.data[0].start).format('yyyy-MM-DDThh:mm:ss')
            formInput['end'] = moment(res.data[0].end).format('yyyy-MM-DDThh:mm:ss')
            this.setState({formInput, modal : !this.state.modal, id_agenda:res.data[0].id_agenda, status:'edit'})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleExit = ()=>{
        let {formInput} = this.state
        formInput['title'] = ''
        formInput['start'] = ''
        formInput['end'] = ''
        
        this.setState({modal:!this.state.modal, formInput})
    }

    submitAgenda = ()=>{
        let {start, title, end} = this.state.formInput

        if(!start || !title || !end || !this.state.dataEvent.idEvent || !this.state.dataUser.id_user){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }

        let data = {start, title, end, id_event: this.state.dataEvent.idEvent, id_user:this.state.dataUser.id_user}
        console.log(data)
        axios.post(`/agenda`, data)
        .then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Agenda Tersimpan',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({modal:!this.state.modal})
            this.getRecap(this.state.dataEvent)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    editAgenda = ()=>{
        let {start, end, title} = this.state.formInput
        if(!start || !title || !end || !this.state.dataUser.id_user){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }

        let data = {start, title, end, id_user:this.state.dataUser.id_user}
        axios.put(`/save_agenda/${this.state.id_agenda}`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Agenda Tersimpan',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({modal:!this.state.modal})
            this.getRecap(this.state.dataEvent)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChange = (event)=>{
        let{formInput} = this.state
        console.log(event.target.value)
        formInput[event.target.name] = event.target.value
        this.setState({formInput})
    }
    
    renderTextField = (value, name, label, type, shrink)=>{
        return(
            <TextField 
                style={{backgroundColor:'white'}} 
                fullWidth 
                className="rounded mt-3"
                name={name}
                size="small" 
                label={label} 
                type={type}
                value={value}
                variant="filled" 
                onChange={this.handleChange}
                InputLabelProps={shrink}
            />
        )
    }

    render() {
        if(this.state.dataEvent === null || this.state.events === null){
            return(
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
        }

        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <Paper className="p-3" elevation={3}>
                        <button onClick={this.toggleAdd} className="btn btn-dark mb-4">Add Agenda</button>
                        <DnDCalendar
                            defaultDate={moment().toDate()}
                            defaultView="month"
                            events={this.state.events}
                            onDoubleClickEvent={this.toggleEdit}
                            localizer={localizer}
                            // onEventDrop={this.onEventDrop}
                            // onEventResize={this.onEventResize}
                            resizable
                            style={{ height: "56vh" }}
                            />
                    </Paper>
                    
                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggleExit} >
                    <ModalHeader toggle={this.toggleExit}>Activity Detail</ModalHeader>
                    <ModalBody>
                        {this.renderTextField(this.state.formInput.title, 'title', 'Activity Name', '', null)}
                        {this.renderTextField(this.state.formInput.start, 'start', 'Start Date', 'datetime-local', {shrink:true})}
                        {this.renderTextField(this.state.formInput.end, 'end', 'End Date', 'datetime-local', {shrink:true})}
                        
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-danger" onClick={this.toggleExit}>Cancel</button>
                    <button className="btn btn-success" onClick={this.state.status === 'add' ? this.submitAgenda : this.editAgenda}>Save</button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default timeline
