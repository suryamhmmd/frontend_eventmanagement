import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

export class recapSurat extends Component {

    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
        modal: false,
        id_surat:'',
        formSurat:{
            nosurat:'',
            tanggal_masuk:'',
            tanggal_keluar:'',
            perihal:'',
            surat_dari:'',
            kepada:'',
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
        axios.get(`/surat/${dataEvent.idEvent}`)
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
        let {formSurat} = this.state
        formSurat[event.target.name] = event.target.value
        this.setState({formSurat})
    }

    toggleEdit = (id_surat)=>{
        axios.get(`/edit_surat/${id_surat}`)
        .then(res=>{
            this.setState({
                modal: !this.state.modal,
                formSurat: res.data[0],
                id_surat:id_surat
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleExit = ()=>{
        this.setState({modal:!this.state.modal})
    }

    editSurat = ()=>{
        let {nosurat, perihal, tanggal_keluar, tanggal_masuk, surat_dari, kepada, pj} = this.state.formSurat

        if(!nosurat || !perihal || !surat_dari || !kepada || !pj){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data
        if(tanggal_keluar){
            data = {nosurat, perihal, surat_dari, kepada, pj, tanggal_keluar: tanggal_keluar.slice(0,10)}
        }else{
            data = {nosurat, perihal, surat_dari, kepada, pj, tanggal_masuk: tanggal_masuk.slice(0,10)}

        }
        console.log(tanggal_keluar)
        axios.put(`/save_surat/${this.state.id_surat}`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Surat Tersimpan',
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
        let data = this.state.dataRecap.map(val=>{
            let tanggal_masuk = '-'
            let tanggal_keluar = '-'
            if(val.tanggal_masuk){
                tanggal_masuk = val.tanggal_masuk.slice(0,10)
            }else{
                tanggal_keluar = val.tanggal_keluar.slice(0,10)
            }

            return(
                <tr key={val.id_surat}>
                    <td>{val.nosurat}</td>
                    <td>{val.surat_dari}</td>
                    <td>{val.kepada}</td>
                    <td>{val.perihal}</td>
                    <td>{tanggal_masuk}</td>
                    <td>{tanggal_keluar}</td>
                    <td>{val.pj}</td>
                    <td>
                        <button onClick={()=>{this.toggleEdit(val.id_surat)}} className="btn btn-warning">Edit</button>
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

        let {nosurat, surat_dari, kepada, perihal, tanggal_keluar, tanggal_masuk, pj} = this.state.formSurat
            
            if(tanggal_masuk){
                tanggal_masuk = tanggal_masuk.slice(0,10)
                tanggal_keluar = ''
            }else{
                tanggal_masuk= ''
                tanggal_keluar = tanggal_keluar.slice(0,10)
            }
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Rekapitulasi Surat</h2>
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
                                <th>Nomor Surat</th>
                                <th>Surat Dari</th>
                                <th>Kepada</th>
                                <th>Perihal</th>
                                <th>Tanggal Surat Masuk</th>
                                <th>Tanggal Surat Keluar</th>
                                <th>Penanggung Jawab</th>
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
                                {this.renderTextField('nosurat', 'Nomor Surat', '', null, nosurat)}
                                {this.renderTextField('tanggal_masuk', 'Tanggal Surat Masuk', 'date', {shrink: true,}, tanggal_masuk)}
                                {this.renderTextField('tanggal_keluar', 'Tanggal Surat Keluar', 'date', {shrink: true,}, tanggal_keluar)}
                                {this.renderTextField('perihal', 'Perihal', '', null, perihal)}
                            </div>
                            <div className="col-6">
                                {this.renderTextField('surat_dari', 'Surat Dari', '', null, surat_dari)}
                                {this.renderTextField('kepada', 'Kepada', '', null, kepada)}
                                {this.renderTextField('pj', 'Penanggung Jawab', '', null, pj)}
                                
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
                    <button className="btn btn-success" onClick={this.editSurat}>Save</button>{' '}
                    <button className="btn btn-danger" onClick={this.toggleExit}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default recapSurat
