import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InputSurat from './inputSurat'
import InputProposal from './inputProposal'
import InputMoU from './inputMoU'
import InputNotulensi from './inputNotulensi'

export class inputArchiving extends Component {
    state = {
        dataEvent:null,
        open:false,
        jenisInput:'',
        dataUser:null
    }

    componentDidMount(){
        let dataEvent = JSON.parse(localStorage.getItem('dataEvent'))
        let dataUser = JSON.parse(localStorage.getItem('userData'))
        this.setState({dataEvent, dataUser})
    }

    handleClick = ()=>{
        this.setState({open:!this.state.open})
    }

    handleClick2 = (jenis)=>{
        this.setState({jenisInput:jenis, open:!this.state.open})
    }
    render() {
        if(this.state.dataEvent === null){
            return(
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
        }
        
        return (
            <div className="container-fluid" style={{marginTop:'80px'}}>
                <Sidebar/>
                <div className="border rounded p-4" style={{marginLeft:'320px', marginBottom:'23px'}}>
                    <h1 className="text-center mb-4">{this.state.dataEvent.namaEvent}</h1>
                    <ListItem style={{backgroundColor:'#363755'}} button className="w-50" onClick={this.handleClick}>
                        <ListItemText className="text-white" primary="Jenis Input" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List onClick={()=>this.handleClick2('surat')} component="div" disablePadding>
                        <ListItem button>
                            <ListItemText primary="Surat" />
                        </ListItem>
                        </List>
                        <List onClick={()=>this.handleClick2('proposal')} component="div" disablePadding>
                        <ListItem button>
                            <ListItemText primary="Proposal" />
                        </ListItem>
                        </List>
                        <List onClick={()=>this.handleClick2('mou')} component="div" disablePadding>
                        <ListItem button>
                            <ListItemText primary="MoU" />
                        </ListItem>
                        </List>
                        <List onClick={()=>{this.handleClick2('notulensi')}} component="div" disablePadding>
                        <ListItem button>
                            <ListItemText primary="Notulensi Rapar" />
                        </ListItem>
                        </List>
                    </Collapse>
                    
                    {
                        !this.state.jenisInput ?
                        null
                        : this.state.jenisInput=== 'surat'?

                        <InputSurat event = {this.state.dataEvent} user = {this.state.dataUser}/>
                        : this.state.jenisInput === 'proposal' ?
                        <InputProposal event = {this.state.dataEvent} user = {this.state.dataUser}/>
                        : this.state.jenisInput==='mou' ?
                        <InputMoU event = {this.state.dataEvent} user = {this.state.dataUser} />
                        : 
                        <InputNotulensi event = {this.state.dataEvent} user = {this.state.dataUser}/>
                    }
                </div>
            </div>
        )
        
    }
}


export default inputArchiving