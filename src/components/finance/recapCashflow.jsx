import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2'
import MenuItem from '@material-ui/core/MenuItem';


export class recapCashflow extends Component {
    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
        modal: false,
        id_cashflow:'',
        sum:0,
        formCashflow:{
            jenis:'',
            divisi:'',
            jumlah:'',
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
        axios.get(`/cashflow/${dataEvent.idEvent}`)
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
        let {formCashflow} = this.state
        formCashflow[event.target.name] = event.target.value
        this.setState({formCashflow})
    }

    handleChange2 = (event)=>{
        let {formCashflow} = this.state
        formCashflow['jenis'] = event.target.value
        this.setState({formCashflow})
    }

    toggleEdit = (id_cashflow)=>{
        axios.get(`/edit_cashflow/${id_cashflow}`)
        .then(res=>{
            this.setState({
                modal: !this.state.modal,
                formCashflow: res.data[0],
                id_cashflow:id_cashflow
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    toggleExit = ()=>{
        let reset = {
            jenis:'',
            divisi:'',
            jumlah:'',
            tanggal:'',
            deskripsi:'',
        }
        this.setState({modal:!this.state.modal, formCashflow: reset})
    }

    editCashflow = ()=>{
        let {jenis, divisi, jumlah, tanggal, deskripsi} = this.state.formCashflow

        if(!divisi || !jenis || !jumlah || !tanggal || !deskripsi){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data = {jenis, divisi, jumlah, tanggal: tanggal.toString().slice(0,10), deskripsi}
        console.log(tanggal)
        axios.put(`/save_cashflow/${this.state.id_cashflow}`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cashflow Updated',
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
                type={type}
                value={value}
                variant="filled" 
                onChange={this.handleChange}
                InputLabelProps={shrink}
            />
        )
    }

    renderData = ()=>{
        let saldo = 0
        let data = this.state.dataRecap.map(val=>{
            let jumlah = val.jumlah
            if(val.jenis === 'Pengeluaran'){
                jumlah = -val.jumlah
            }
            saldo = saldo + jumlah
            return(
                <tr key={val.id_cashflow}>
                    <td>{val.divisi}</td>
                    <td>{val.jenis}</td>
                    <td>{val.tanggal.slice(0,10)}</td>
                    <td>{val.deskripsi}</td>
                    <td>{val.jumlah}</td>
                    <td>{saldo}</td>
                    <td>
                        <button onClick={()=>{this.toggleEdit(val.id_cashflow)}} className="btn btn-warning">Edit</button>
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
        let {divisi, tanggal, deskripsi, jumlah} = this.state.formCashflow

        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Rekapitulasi Cashflow</h2>
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
                                <th>Kategori</th>
                                <th>Tanggal</th>
                                <th>Deskripsi</th>
                                <th>Jumlah (Rp)</th>
                                <th>Saldo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggleExit} >
                    <ModalHeader toggle={this.toggleExit}>Edit Cashflow</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-12">
                                {this.renderTextField('divisi', 'Divisi', '', null, divisi)}
                                <TextField
                                    className="mt-3"
                                    fullWidth
                                    size="small"
                                    select
                                    label="Jenis"
                                    value={this.state.formCashflow.jenis}
                                    onChange={this.handleChange2}
                                    variant="filled"
                                    >
                                        <MenuItem value="Pengeluaran">
                                            Pengeluaran
                                        </MenuItem>
                                        <MenuItem value="Pemasukan">
                                            Pemasukan
                                        </MenuItem>

                                </TextField>
                                {this.renderTextField('tanggal', 'Tanggal', 'date', {shrink:true}, tanggal.toString().slice(0,10))}
                                {this.renderTextField('deskripsi', 'Deskripsi ', '', null, deskripsi)}
                                {this.renderTextField('jumlah', 'Jumlah', '', null, jumlah)}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-success" onClick={this.editCashflow}>Save</button>{' '}
                    <button className="btn btn-danger" onClick={this.toggleExit}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default recapCashflow