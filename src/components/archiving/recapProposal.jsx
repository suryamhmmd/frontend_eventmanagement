import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import MenuItem from '@material-ui/core/MenuItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export class recapProposal extends Component {
   
    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
        modal: false,
        id_proposal:'',
        formProposal:{
            nama:'',
            tujuan:'',
            tanggal_buat:'',
            jenis:'',
            status:'',
            pj:''
        },
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
        this.getRecap(dataEvent)
    }

    getRecap = (dataEvent)=>{
        axios.get(`/proposal/${dataEvent.idEvent}`)
        .then(res=>{
            this.setState({dataRecap:res.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    onSearch = ()=>{

    }

    handleChange = (event)=>{
        let {formProposal} = this.state
        formProposal[event.target.name] = event.target.value
        this.setState({formProposal})
    }

    toggleEdit = (id_proposal)=>{
        axios.get(`/edit_proposal/${id_proposal}`)
        .then(res=>{
            this.setState({
                modal: !this.state.modal,
                formProposal: res.data[0],
                id_proposal:id_proposal
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleExit = ()=>{
        this.setState({modal:!this.state.modal})
    }

    editProposal = ()=>{
        let {nama, tujuan, tanggal_buat, jenis, status,pj} = this.state.formProposal

        if(!nama || !tujuan || !tanggal_buat || !jenis || !status || !pj){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }

        console.log(tanggal_keluar)
        axios.put(`/save_proposal/${this.state.id_proposal}`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Proposal Tersimpan',
                showConfirmButton: false,
                timer: 1500
            })
            this.getRecap(this.state.dataEvent)
            this.setState({modal:!this.state.modal})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    renderTextField = (name, label, type, shrink, value)=>{
        return(
            <TextField 
                style={{backgroundColor:'white'}} 
                fullWidth 
                className="rounded mt-3"
                name={name}
                size="small" 
                label={label}
                value={value}
                type={type}
                variant="filled" 
                onChange={this.handleChange}
                InputLabelProps={shrink}
            />
        )
    }

    renderData = ()=>{

            return(
                <tr key={val.id_proposal}>
                    <td>{val.nama}</td>
                    <td>{val.tujuan}</td>
                    <td>{val.tanggal_buat}</td>
                    <td>{val.jenis}</td>
                    <td>{val.status}</td> 
                    <td>{val.pj}</td>
                        <button onClick={()=>{this.toggleEdit(val.id_proposal)}} className="btn btn-warning">Edit</button>
                    </td>
                </tr>
        })
        return data
    }

    render() {
        if(this.state.dataRecap === null || this.state.dataEvent === null){
            return(
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
        }

        let {nama, tujuan, tanggal_buat, jenis, status,pj} = this.state.formProposal
           
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Rekapitulasi Proposal</h2>
                        <TextField 
                            style={{backgroundColor:'white'}}
                            name="search"
                            size="small" 
                            label="Search" 
                            variant="outlined"
                            onChange={this.onSearch}
                        />
                    </div>
                    <table className="table table-bordered table-hover mt-3">
                        <thead>
                            <tr>
                                <th>Nama Proposal</th>
                                <th>Tujuan</th>
                                <th>Tanggal dibuat</th>
                                <th>Jenis Proposal</th>
                                <th>Penanggung Jawab</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table>
                    
                </div>

                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggleExit} >
                    <ModalHeader toggle={this.toggleExit}>Edit Proposal</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6">
                            {this.renderTextField('nama', 'Nama Proposal', '', null, nama)}
                            {this.renderTextField('tujuan', 'Tujuan', '', null,tujuan)}
                            {this.renderTextField('tanggal_buat', 'Tanggal dibuat', 'date', {shrink: true,},tanggal_buat)}
                            <TextField
                                className="mt-3"
                                fullWidth
                                size="small"
                                select
                                label="Jenis"
                                value={this.state.formProposal.jenis}
                                onChange={this.handleChange2}
                                variant="filled"
                                >
                                    <MenuItem value="Low">
                                        Low
                                    </MenuItem>
                                    <MenuItem value="Medium">
                                        Medium
                                    </MenuItem>
                                    <MenuItem value="High">
                                        High
                                    </MenuItem>
                            </TextField>
                            </div>
                            <div className="col-6">
                                <FormControl component="fieldset">
                                    <RadioGroup onChange={this.handleChange3} row aria-label="position" name="position" defaultValue="top">
                                        <FormControlLabel value="Accept" control={<Radio color="primary" />} label="Accept" />
                                        <FormControlLabel value="Pending" control={<Radio color="primary" />} label="Pending" />
                                        <FormControlLabel value="Reject" control={<Radio color="primary" />} label="Reject" />
                                    </RadioGroup>
                                    </FormControl>
                                    {this.renderTextField('pj', 'Penanggung Jawab', '', null,pj)}
                                
                                <Button
                                    fullWidth
                                    size="large"
                                    className="mt-3"
                                    variant="contained"
                                    component="label"
                                    >
                                    Upload File
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-success" onClick={this.editProposal}>Save</button>{' '}
                    <button className="btn btn-danger" onClick={this.toggleExit}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default recapProposal
