import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {keepLogin} from '../actions/login'

import HomePage from './HomePage'
import Register from './Register'
import Login from './Login'

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
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, {keepLogin})(Apps)
