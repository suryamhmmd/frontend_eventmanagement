import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import { Link } from 'react-router-dom';


export class Header extends Component {
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
            return(
                <Navbar className="navbar fixed-top" expand="md">
                    <NavbarBrand className="logo_navbar">
                        <h4 style={{color:'white'}}>Event Management App</h4>
                    </NavbarBrand>
                    <h4 className="text-white">Nama Event</h4>

                    <h4 className="text-white mx-auto">Welcome</h4>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="navbar-link" tag={Link} to="/product">Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="navbar-link" tag={Link} to="/contact_us">Contact Us</NavLink>
                        </NavItem>
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

export default connect(mapStateToProps)(Header)
