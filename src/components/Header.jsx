import React, { Component } from 'react'
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
        return (
            <div>
                <Navbar className="navbar" expand="md">
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
    }
}

export default Header
