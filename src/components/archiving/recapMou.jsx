import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import axios from '../../config/axios'

export class recapMou extends Component {
    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null,
        dataRecap:null,
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
        this.getRecap()
    }

    getRecap = ()=>{
        axios.get(`/surat`)
        .then(res=>{
            this.setState({dataRecap:res.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    onSearch = ()=>{

    }

    renderData = ()=>{
        let data = this.state.dataRecap.map(val=>{
            return(
                <tr key={val.id_perjanjian}>
                    <td>{val.nama_instansi}</td>
                    <td>{val.nama_panitia}</td>
                    <td>{val.jabatan}</td>
                    <td>{val.divisi}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.deskripsi}</td>
                    <td>
                        <button className="btn btn-warning">Edit</button>
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

        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <h2>Rekapitulasi MoU</h2>
                    <TextField 
                        style={{backgroundColor:'white'}}
                        name="search"
                        size="small" 
                        label="Search" 
                        variant="outlined"
                        onChange={this.onSearch}
                    />
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
            </div>
        )
    }
}

export default recapMou
