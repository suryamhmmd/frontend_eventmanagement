import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

export class Welcome extends Component {
    render() {
        if(this.props.login){
            return (
                <div className="home-page">
                    <div className="d-flex justify-content-center">
                        <div className="path-31 d-flex flex-column justify-content-around align-items-center">
                            <h1 className="text-center mt-5">Welcome, {this.props.login.nama}</h1>
                            <div className="d-flex flex-row button-homepage">
                                <Link to="/register">
                                    <div className="btn btn-outline-light mx-4">
                                        <DashboardIcon  style={{width:200, height:200}}/>
                                        <h3>Dashboard</h3>
                                    </div>
                                </Link>
                                <Link to="/login">
                                    <div className="btn btn-outline-light mx-4">
                                        <InsertInvitationIcon style={{width:200, height:200}}/>
                                        <h3>Create Event</h3>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to='/'/>
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        login: state.auth.data
    }
}

export default connect(mapStateToProps)(Welcome)
