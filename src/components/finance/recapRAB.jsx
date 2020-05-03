import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2'

export class recapRAB extends Component {

    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
        modal: false,
        id_surat:'',
        sum:0,
        formRab:{
            divisi:'',
            keterangan:'',
            jumlah:'',
            satuan:'',
            harga_satuan:''
        },
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
        this.getRab(dataEvent)
    }

    getRab = (dataEvent)=>{
        axios.get(`/rab/${dataEvent.idEvent}`)
        .then(res=>{
            let total = 0
            res.data.map(val=>{
                return total = total + (val.harga_satuan * val.jumlah)
                
            })
            this.setState({dataRecap:res.data, sum: total})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChange = (event)=>{
        let {formRab} = this.state
        formRab[event.target.name] = event.target.value
        this.setState({formRab})
    }

    toggleEdit = (id_rab)=>{
        axios.get(`/edit_rab/${id_rab}`)
        .then(res=>{
            this.setState({
                modal: !this.state.modal,
                formRab: res.data[0],
                id_rab:id_rab
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleExit = ()=>{
        let reset = {
            divisi:'',
            keterangan:'',
            jumlah:'',
            satuan:'',
            harga_satuan:''
        }
        this.setState({modal:!this.state.modal, formRab: reset})
    }

    editRab = ()=>{
        let {divisi, keterangan, jumlah, satuan, harga_satuan} = this.state.formRab

        if(!divisi || !keterangan || !jumlah || !satuan || !harga_satuan){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data = {divisi, keterangan, jumlah, satuan, harga_satuan}

        axios.put(`/save_rab/${this.state.id_rab}`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'RAB Updated',
                showConfirmButton: false,
                timer: 1500
            })
            this.getRab(this.state.dataEvent)
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
                <tr key={val.id_rab}>
                    <td>{val.divisi}</td>
                    <td>{val.keterangan}</td>
                    <td>{val.jumlah}</td>
                    <td>{val.satuan}</td>
                    <td>{val.harga_satuan}</td>
                    <td>{val.jumlah * val.harga_satuan}</td>
                    <td>Terbayar</td>
                    <td>
                        <button onClick={()=>{this.toggleEdit(val.id_rab)}} className="btn btn-warning">Edit</button>
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
        let {divisi, keterangan, jumlah, satuan, harga_satuan} = this.state.formRab
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Rekapitulasi RAB</h2>
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
                                <th>Divisi</th>
                                <th>Keterangan</th>
                                <th>Jumlah</th>
                                <th>Satuan</th>
                                <th>Harga Satuan</th>
                                <th>Sub Total</th>
                                <th>Terbayar</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>Total RAB</td>
                                <td colSpan={5}>{this.state.sum}</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                </div>

                
                <Modal isOpen={this.state.modal} toggle={this.toggleExit} >
                    <ModalHeader toggle={this.toggleExit}>Edit RAB</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-12">
                                {this.renderTextField('divisi', 'Divisi', '', null, divisi)}
                                {this.renderTextField('keterangan', 'Keterangan', '', null, keterangan)}
                                {this.renderTextField('jumlah', 'Jumlah', '', null, jumlah)}
                                {this.renderTextField('satuan', 'Satuan ', '', null, satuan)}
                                {this.renderTextField('harga_satuan', 'Harga Satuan', '', null, harga_satuan)}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-success" onClick={this.editRab}>Save</button>{' '}
                    <button className="btn btn-danger" onClick={this.toggleExit}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default recapRAB
