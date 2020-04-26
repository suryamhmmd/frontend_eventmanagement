import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'


export class HomePage extends Component {
    render() {
        if(!this.props.login){
            return (
                <div className="home-page">
                    <div className="d-flex justify-content-center">
                        <div className="path-31 d-flex flex-column justify-content-between align-items-center">
                            <h1 className="text-center mt-5">Aplikasi yang membantu dalam mengatur sebuah event</h1>
                            <div className="d-flex flex-row button-homepage">
                                <Link to="/register">
                                    <button className="mx-5 button">Register</button>
                                </Link>
                                <Link to="/login">
                                    <button className="mx-4 button">Login</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to="/welcompe_page"/>
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        login: state.auth.data
    }
}

export default connect(mapStateToProps)(HomePage)
