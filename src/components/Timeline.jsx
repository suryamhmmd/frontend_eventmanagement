import React, { Component } from 'react'
import Sidebar from './Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';




export class Timeline extends Component {
    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
    }

    handleClick = ()=>{
        this.setState({open:!this.state.open})
    }

    handleClick2 = (jenis)=>{
        this.setState({jenisInput:jenis, open:!this.state.open})
    }
    
    render() {
        if(this.state.dataEvent === null){
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
                    <h2>fitur belum tersedia, gunakan google calendar/excel :)</h2>
                </div>
            </div>
        )
        
    }
}


export default Timeline
