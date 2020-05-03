import React, { Component } from 'react'
import {connect} from 'react-redux'
import {logOut} from '../actions/index'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import axios from '../config/axios';


export class Header extends Component {

    state = {
        dataEvent:null
    }
    componentDidMount(){
        this.getEvent()
    }

    getEvent = ()=>{
        axios.get(`/event`)
        .then(res=>{
            this.setState({dataEvent: res.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    createSession = (namaEvent, idEvent)=>{
        localStorage.setItem('dataEvent', JSON.stringify({namaEvent:namaEvent, idEvent:idEvent}))
    }

    onLogout = ()=>{
        window.location.pathname="/"
        this.props.logOut()

    }
    
    renderEvent = ()=>{
        let data = this.state.dataEvent.map(val=>{
            return(
                <div key={val.nama}>
                    <Link to={{
                        pathname:'/dashboard',
                        state:{
                            namaEvent:val.nama,
                            idEvent:val.id_event
                        }
                    }}>
                        <DropdownItem  onClick={()=>{this.createSession(val.nama, val.id_event)}}>
                            {val.nama}
                        </DropdownItem>
                    </Link>
                </div>
            )
        })
        return data
    }

    render() {
        if(!this.props.login){
            return (
                <div>
                    <Navbar className="navbar fixed-top" expand="md">
                        <NavbarBrand className="logo_navbar">
                            <h4 style={{color:'white'}}>Event Management App</h4>
                        </NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="navbar-link" tag={Link} to="/product">Product</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navbar-link" tag={Link} to="/contact_us">Contact Us</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
            )
        }else{

            if(this.state.dataEvent === null){
                return <h1>Loading</h1>
            }

            return(
                <Navbar className="navbar fixed-top" expand="md">
                    <NavbarBrand className="logo_navbar">
                        <h5 style={{color:'white'}}>Event Management App</h5>
                    </NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="font-weight-bold mb-0" nav caret>
                                <span className="text-white">Event</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {this.renderEvent()}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="d-flex flex-row justify-content-center align-items-center font-weight-bold mb-0" nav caret>
                                <Avatar className="mr-2" style={{backgroundColor:'#477B9F', width:'24px', height:'24px', fontSize:'12px'}}>{this.props.login.nama.slice(0,1)}</Avatar> <span className="text-white">Hi, {this.props.login.nama}</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.onLogout}>
                                Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar>
            )
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        login: state.auth.data
    }
}

export default connect(mapStateToProps, {logOut})(Header)
