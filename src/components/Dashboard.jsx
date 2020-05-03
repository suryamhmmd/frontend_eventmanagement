import React, { Component } from 'react'
import Sidebar from './Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from '../config/axios';

export class Dashboard extends Component {

    state = {
        dataEvent:null,
        totalPengeluaran:0,
        totalPemasukan:0,
        totalBudget:0,
        saldo:0,
        dataMou:null,
        mailIn:0,
        mailOut:0,
    }

    componentDidMount(){
        let data = JSON.parse(localStorage.getItem('dataEvent'))
        this.setState({dataEvent:data})
        this.getRab(data)
        this.getCashflow(data)
        this.getMou(data)
        this.getSurat(data)
    }

    getRab = (dataEvent)=>{
        axios.get(`/rab/${dataEvent.idEvent}`)
        .then(res=>{
            let total = 0
            res.data.map(val=>{
                return total = total + (val.jumlah * val.harga_satuan)
            })
            this.setState({totalBudget:total})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getMou = (dataEvent)=>{
        axios.get(`/mou/${dataEvent.idEvent}`)
        .then(res=>{
            this.setState({dataMou:res.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getCashflow = (dataEvent)=>{
        axios.get(`/cashflow/${dataEvent.idEvent}`)
        .then(res=>{
            let totalPemasukan = 0
            let totalPengeluaran = 0
            let saldo = 0
            let jumlah = 0
            res.data.map(val=>{
                if(val.jenis === 'Pemasukan'){
                    totalPemasukan = totalPemasukan + val.jumlah
                    jumlah = val.jumlah
                    
                }else{
                    totalPengeluaran = totalPengeluaran + val.jumlah
                    jumlah = -val.jumlah
                }
                return saldo = saldo + jumlah
            })
            this.setState({totalPemasukan, totalPengeluaran, saldo})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getSurat = (dataEvent)=>{
        axios.get(`/surat/${dataEvent.idEvent}`)
        .then(res=>{
            let mailIn = 0
            let mailOut = 0
            res.data.map(val=>{
                if(val.tanggal_keluar){
                    return mailIn = mailIn + 1
                }else{
                    return mailOut = mailOut +1
                }
                
            })
            this.setState({mailIn, mailOut})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    renderMou = ()=>{
        if(this.state.dataMou.length === 0){
            return(
                <tr>
                    <td className="text-center" colSpan={6}>No Data</td>
                </tr>
            )
        }
        let data = this.state.dataMou.map(val=>{
            return(
                <tr key={val.id_perjanjian}>
                    <td>{val.nama_instansi}</td>
                    <td>{val.nama_panitia}</td>
                    <td>{val.jabatan}</td>
                    <td>{val.divisi}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.deskripsi}</td>
                </tr>
            )
        })
        return data
    }

    render() {
        if(this.state.dataEvent === null || this.state.dataMou === null){
            return(
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
        }
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px', height:'680px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <div className="row">
                        <div className="col-8 border rounded-lg p-0">
                            <h2 className="text-center text-white" style={{backgroundColor:'#363755'}}>Agenda</h2>

                        </div>
                        <div className="col-4 border rounded-lg p-0">
                            <h2 className="text-center text-white" style={{backgroundColor:'#363755'}}>Finance</h2>
                            <div className="px-3 row">
                                <div className="col-6">
                                    <p>Total Budget :</p>
                                    <p>Total Cash In :</p>
                                    <p>Total Cash Out :</p>
                                    <p>Balance :</p>
                                </div>
                                <div className="col-6">
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.totalBudget).replace(/,/g, '.')}</p>
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.totalPemasukan).replace(/,/g, '.')}</p>
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.totalPengeluaran).replace(/,/g, '.')}</p>
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.saldo).replace(/,/g, '.')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3 border rounded-lg p-0">
                            <h2 className="text-center text-white" style={{backgroundColor:'#363755'}}>Archiving</h2>
                            <div className="px-3">
                                <p>Mail In : {this.state.mailIn}</p>
                                <p>Mail Out : {this.state.mailOut}</p>
                            </div>
                            <div className="px-3">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nama Instansi</th>
                                            <th>Nama Panitia</th>
                                            <th>Jabatan</th>
                                            <th>Divisi</th>
                                            <th>Tanggal Kontrak</th>
                                            <th>Isi Kontrak</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderMou()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
