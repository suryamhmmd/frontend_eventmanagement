import React, { Component } from 'react'
import Sidebar from './Sidebar'

export class Dashboard extends Component {
    render() {
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    
                </div>
            </div>
        )
    }
}

export default Dashboard
