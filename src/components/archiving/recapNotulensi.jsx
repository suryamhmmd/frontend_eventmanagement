import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2'

export class recapNotulensi extends Component {
    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
        modal: false,
        id_rapat:'',
        formRapat:{
            nama_rapat:'',
            tanggal:'',
            tempat:'',
            isi:'',
        },
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
        this.getRecap(dataEvent)
    }

    getRecap = (dataEvent)=>{
        axios.get(`/notulensi/${dataEvent.idEvent}`)
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
        let {formRapat} = this.state
        formRapat[event.target.name] = event.target.value
        this.setState({formRapat})
    }

    toggleEdit = (id_rapat)=>{
        axios.get(`/edit_notulensi/${id_rapat}`)
        .then(res=>{
            this.setState({
                modal: !this.state.modal,
                formRapat: res.data[0],
                id_rapat:id_rapat
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleExit = ()=>{
        this.setState({modal:!this.state.modal})
    }

    editRapat = ()=>{
        let {nama_rapat, tanggal, tempat, isi} = this.state.formRapat

        if(!nama_rapat || !tanggal || !tempat || !isi){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data = {nama_rapat,tanggal: tanggal.toString().slice(0,10), tempat, isi}

        axios.put(`/save_notulensi/${this.state.id_rapat}`, data)
        .then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Notulensi Tersimpan',
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

    renderTextField = (name, label, type, shrink, value, multiline,row)=>{
        return(
            <TextField 
                style={{backgroundColor:'white'}} 
                fullWidth 
                multiline={multiline}
                rows={row}
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
        let data = this.state.dataRecap.map(val=>{
            return(
                <tr key={val.id_rapat}>
                    <td>{val.nama_rapat}</td>
                    <td>{val.tanggal.slice(0,10)}</td>
                    <td>{val.tempat}</td>
                    <td>{val.isi}</td> 
                    <td>
                        <button onClick={()=>{this.toggleEdit(val.id_rapat)}} className="btn btn-warning">Edit</button>
                    </td>
                </tr>
            )
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

        let {nama_rapat, tanggal, tempat, isi} = this.state.formRapat
           
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Rekapitulasi Notulensi</h2>
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
                                <th>Nama Rapat</th>
                                <th>Tanggal</th>
                                <th>Tempat</th>
                                <th>Isi Rapat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table>
                    
                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggleExit} >
                    <ModalHeader toggle={this.toggleExit}>Edit Notulensi</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-12">
                            {this.renderTextField('nama_rapat', 'Nama Rapat', '', null, nama_rapat)}
                            {this.renderTextField('tanggal', 'Tanggal', 'date', {shrink: true,},tanggal.toString().slice(0,10))}
                            {this.renderTextField('tempat', 'Tujuan', '', null, tempat)}
                            {this.renderTextField('isi', 'Isi Rapat', '', null, isi, true, 4)}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-success" onClick={this.editRapat}>Save</button>{' '}
                    <button className="btn btn-danger" onClick={this.toggleExit}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default recapNotulensi
