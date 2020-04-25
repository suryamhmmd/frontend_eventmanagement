import React, { Component } from 'react'
import Header from './Header'


export class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <div>
                    <Header/>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="path-31 d-flex flex-column justify-content-between align-items-center">
                        <h1 className="text-center mt-5">Aplikasi yang membantu dalam mengatur sebuah event</h1>
                        <div className="d-flex flex-row button-homepage">
                            <button className="mx-5 button">Register</button>
                            <button className="mx-4 button">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
