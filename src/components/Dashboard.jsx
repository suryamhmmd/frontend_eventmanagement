import React, { Component } from 'react'
import Sidebar from './Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

export class Dashboard extends Component {

    state = {
        dataEvent:null,
        
    }

    componentDidMount(){
        let data = JSON.parse(localStorage.getItem('dataEvent'))
        console.log(data)
        this.setState({dataEvent:data})
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
                    <h1>{this.state.dataEvent.namaEvent}</h1>
                    <div className="row">
                        <div className="col-8">
                            <h2>Agenda</h2>
                        </div>
                        <div className="col-4">
                            <h2>Finance</h2>
                        </div>
                        <div className="col-12">
                            <h2>Archiving</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
