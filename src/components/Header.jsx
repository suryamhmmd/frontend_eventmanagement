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
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="d-flex flex-row justify-content-center align-items-center font-weight-bold mb-0" nav caret>
                                <Avatar className="mr-2" style={{backgroundColor:'#477B9F', width:'24px', height:'24px', fontSize:'12px'}}>{this.props.login.nama.slice(0,1)}</Avatar> <span className="text-white">Hi, {this.props.login.nama}</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.props.logOut}>
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
