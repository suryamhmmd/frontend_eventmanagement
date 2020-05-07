import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'
import Swal from 'sweetalert2'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';

export class recapMou extends Component {
    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
        modal: false,
        id_mou:'',
        formMou:{
            nama_instansi:'',
            nama_panitia:'',
            jabatan:'',
            divisi:'',
            tanggal:'',
            deskripsi:'',
        },
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
        this.getRecap(dataEvent)
    }

    getRecap = (dataEvent)=>{
        axios.get(`/mou/${dataEvent.idEvent}`)
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
        let {formMou} = this.state
        formMou[event.target.name] = event.target.value
        this.setState({formMou})
    }

    toggleEdit = (id_mou)=>{
        axios.get(`/edit_mou/${id_mou}`)
        .then(res=>{
            this.setState({
                modal: !this.state.modal,
                formMou: res.data[0],
                id_mou:id_mou
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleExit = ()=>{
        this.setState({modal:!this.state.modal})
    }

    editMou = ()=>{
        let {nama_instansi, nama_panitia, jabatan, divisi, tanggal, deskripsi} = this.state.formMou

        if(!nama_instansi || !nama_panitia || !jabatan || !divisi || !tanggal || !deskripsi){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data = {nama_instansi, nama_panitia, jabatan, divisi, tanggal, deskripsi}
        
        axios.put(`/save_mou/${this.state.id_mou}`, data)
        .then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mou Tersimpan',
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

    renderTextField = (value, name, label, type, shrink, multiple, row)=>{
        return(
            <TextField 
                style={{backgroundColor:'white'}} 
                fullWidth 
                multiline={multiple}
                rows={row}
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

    renderData = ()=>{
        let data = this.state.dataRecap.map(val=>{
            return(
                <tr key={val.id_perjanjian}>
                    <td>{val.nama_instansi}</td>
                    <td>{val.nama_panitia}</td>
                    <td>{val.jabatan}</td>
                    <td>{val.divisi}</td>
                    <td>{val.tanggal.toString().slice(0,10)}</td>
                    <td>{val.deskripsi}</td>
                    <td>
                        <button onClick={()=>{this.toggleEdit(val.id_perjanjian)}} className="btn btn-warning">Edit</button>
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
        let {nama_panitia, nama_instansi, jabatan, divisi, tanggal, deskripsi} = this.state.formMou
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <div className="d-flex flex-row justify-content-between mb-3">
                        <h2>Rekapitulasi MoU</h2>
                        <TextField 
                            style={{backgroundColor:'white'}}
                            name="search"
                            size="small" 
                            label="Search" 
                            variant="outlined"
                            onChange={this.onSearch}
                        />
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Nama Instansi</th>
                                <th>Nama Panitia</th>
                                <th>Jabatan</th>
                                <th>Divisi</th>
                                <th>Tanggal Kontrak</th>
                                <th>Isi Kontrak</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table>
                    
                </div>

                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggleExit} >
                    <ModalHeader toggle={this.toggleExit}>Edit Surat</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6">
                                {this.renderTextField(nama_instansi, 'nama_instansi', 'Nama Instansi', '', null, false, '')}
                                {this.renderTextField(nama_panitia, 'nama_panitia', 'Nama Panitia', '', null, false, '')}
                                {this.renderTextField(divisi, 'divisi', 'Divisi', '', null, false, '')}
                            </div>
                            <div className="col-6">
                                {this.renderTextField(jabatan, 'jabatan', 'Jabatan', '', null, false, '')}
                                {this.renderTextField(tanggal.toString().slice(0,10), 'tanggal', 'Tanggal Kontral', 'date',{shrink:true}, false, '')}
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
                        {this.renderTextField(deskripsi, 'deskripsi', 'Deskripsi', '', null, true, 4)}
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-danger" onClick={this.toggleExit}>Cancel</button>
                    <button className="btn btn-success" onClick={this.editMou}>Save</button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default recapMou
