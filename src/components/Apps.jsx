import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {keepLogin} from '../actions'

import HomePage from './HomePage'
import Register from './Register'
import Login from './Login'
import Welcome from './Welcome'
import Header from './Header'

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
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, {keepLogin})(Apps)
