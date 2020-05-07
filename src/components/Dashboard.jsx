import React, { Component } from 'react'
import Sidebar from './Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from '../config/axios';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export class Dashboard extends Component {
//total pemasukan - total budget
    state = {
        dataEvent:null,
        totalPengeluaran:0,
        totalPemasukan:0,
        totalBudget:0,
        saldo:0,
        dataMou:null,
        dataSurat:null,
        mailIn:0,
        mailOut:0,
        rabcashin:0,
        events:null
    }

    componentDidMount(){
        let data = JSON.parse(localStorage.getItem('dataEvent'))
        this.setState({dataEvent:data})
        this.getRab(data)
        this.getCashflow(data)
        this.getMou(data)
        this.getSurat(data)
        this.getTimeline(data)
    }


    getTimeline = (dataEvent)=>{
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
            console.log(res.data)
            let mailIn = 0
            let mailOut = 0
            res.data.map(val=>{
                if(val.tanggal_keluar){
                    return mailOut = mailOut +1
                }else{
                    return mailIn = mailIn + 1
                }
                
            })
            this.setState({mailIn, mailOut,dataSurat:res.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    renderSurat = ()=>{
        if(this.state.dataSurat.length === 0){
            return(
                <tr>
                    <td className="text-center" colSpan={6}>No Data</td>
                </tr>
            )
        }
        let data = this.state.dataSurat.map(val=>{
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
                    <td>{tanggal_masuk}</td>
                    <td>{tanggal_keluar}</td>
                    <td>{val.perihal}</td>
                    <td>{val.surat_dari}</td>
                    <td>{val.kepada}</td>
                    <td>{val.pj}</td>
                </tr>
            )
        })
        return data
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
                    <td>{val.tanggal.toString().slice(0,10)}</td>
                    <td>{val.deskripsi}</td>
                </tr>
            )
        })
        return data
    }

    render() {
        if(this.state.dataEvent === null || this.state.dataMou === null || this.state.dataSurat===null || this.state.events === null){

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
                            <DnDCalendar
                                className="mx-4"
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
                        </div>
                        <div className="col-4 border rounded-lg p-0">
                            <h2 className="text-center text-white" style={{backgroundColor:'#363755'}}>Finance</h2>
                            <div className="px-3 row">
                                <div className="col-6">
                                    <p>Total RAB :</p>
                                    <p>Total Cash In :</p>
                                    <p>Total Cash Out :</p>
                                    <p>Balance :</p>
                                    <p>RAB-Cash in : </p>
                                </div>
                                <div className="col-6">
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.totalBudget).replace(/,/g, '.')}</p>
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.totalPemasukan).replace(/,/g, '.')}</p>
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.totalPengeluaran).replace(/,/g, '.')}</p>
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.saldo).replace(/,/g, '.')}</p>
                                    <p className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.totalPemasukan - this.state.totalBudget).replace(/,/g, '.')}</p>
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
                                <h1 className="text-center">Surat Terakhir</h1>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No Surat</th>
                                            <th>Tanggal Masuk</th>
                                            <th>Tanggal Keluar</th>
                                            <th>Perihal</th>
                                            <th>Surat Dari</th>
                                            <th>Kepada</th>
                                            <th>PJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSurat()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-5">
                                <h1 className="text-center">MoU Terakhir</h1>
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
