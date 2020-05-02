import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {keepLogin} from '../actions'

import HomePage from './HomePage'
import Register from './Register'
import Login from './Login'
import Welcome from './Welcome'
import Header from './Header'
import Event from './CreateEvent'
import Profile from './Profile'
import Dashboard from './Dashboard'
import inputArchiving from './archiving/inputArchiving'
import RecapSurat from './archiving/recapSurat'

export class Apps extends Component {

    componentDidMount(){
        let userData = JSON.parse(localStorage.getItem('userData'))
        if(userData){
            this.props.keepLogin(userData)
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/welcome_page" component={Welcome}/>
                        <Route path="/create_event" component={Event}/>
                        <Route path="/Profile" component={Profile}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/input_archiving" component={inputArchiving}/>
                        <Route path="/recap_surat" component={RecapSurat}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, {keepLogin})(Apps)
