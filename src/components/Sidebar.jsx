import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimelineIcon from '@material-ui/icons/Timeline';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

export class Sidebar extends Component {

    state = {
        open: false,
        open2:false,
    }

    handleClick = ()=>{
        this.setState({open: !this.state.open})
    }

    handleClick2 = ()=>{
        this.setState({open2: !this.state.open2})
    }
    

    render() {
        return (
            <div>
                <div className="frame-sidebar border rounded position-fixed p-3">
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <Link className="text-decoration-none" style={{color:'black'}} to='/Dashboard'>
                        <ListItem button>
                            <ListItemIcon>
                            <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <ListItem button>
                        <ListItemIcon>
                        <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Timeline" />
                    </ListItem>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                        <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Finance" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <Link className="text-decoration-none" style={{color:'black'}} to="/input_finance">
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Input Cashflow, RAB" />
                            </ListItem>
                            </List>
                        </Link>
                        <Link className="text-decoration-none" style={{color:'black'}} to="/recap_cashflow">
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Rekapitulasi Cashflow" />
                            </ListItem>
                            </List>
                        </Link>
                        <Link className="text-decoration-none" style={{color:'black'}} to="/recap_rab">
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Rekapitulasi RAB" />
                            </ListItem>
                            </List>
                        </Link>
                    </Collapse>

                    <ListItem button onClick={this.handleClick2}>
                        <ListItemIcon>
                        <FileCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Archiving" />
                        {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                        <Link style={{color:'black'}} className="text-decoration-none" to={{
                            pathname:'/input_archiving',
                            state:{
                                jenisInput:''
                            }
                        }}>
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Input Surat, Proposal, MoU, Notulensi" />
                            </ListItem>
                            </List>
                        </Link>
                        <Link style={{color:'black'}} className="text-decoration-none" to="/recap_surat">
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Rekapitulasi Surat" />
                            </ListItem>
                            </List>
                        </Link>
                        <Link style={{color:'black'}} className="text-decoration-none" to='/recap_proposal'>
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Rekapitulasi Proposal" />
                            </ListItem>
                            </List>
                        </Link>
                        <Link style={{color:'black'}} className="text-decoration-none" to='/recap_mou'>
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Rekapitulasi MoU" />
                            </ListItem>
                            </List>
                        </Link>
                        <Link style={{color:'black'}} className="text-decoration-none" to='/recap_notulensi'>
                            <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Rekapitulasi Notulensi Rapat" />
                            </ListItem>
                            </List>
                        </Link>
                    </Collapse>
                </List>
                </div>
            </div>
        )
    }
}

export default Sidebar
