import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
import {Redirect} from  'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export class inputProposal extends Component {
    
    state = {
        formProposal:{
            nama:'',
            tujuan:'',
            tanggal_buat:'',
            jenis:'',
            status:'',
            pj:'',
        },
        redirect: false
    }

    handleChange = (event)=>{
        let {formProposal} = this.state
        formProposal[event.target.name] = event.target.value
        this.setState({formProposal})
    }

    handleChange2 = (event)=>{
        let {formProposal} = this.state
        formProposal['jenis'] = event.target.value
        this.setState({formProposal})
    }

    handleChange3 = (event)=>{
        let {formProposal} = this.state
        formProposal['status'] = event.target.value
        this.setState({formProposal})
    }

    submit = ()=>{
        let {nama,tujuan,tanggal_buat,jenis,status,pj} = this.state.formProposal
        console.log(nama,tujuan,tanggal_buat,jenis,status,pj)
        if(!nama || !tujuan || !tanggal_buat || !jenis || !status || !pj){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data={nama,tujuan,tanggal_buat,jenis, status, pj, id_event:this.props.event.idEvent, id_user:this.props.user.id_user} 

        console.log(data)
        axios.post(`/proposal`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Proposal Tersimpan',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({redirect:true})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    renderTextField = (name, label, type, shrink)=>{
        return(
            <TextField 
                style={{backgroundColor:'white'}} 
                fullWidth 
                className="rounded mt-3"
                name={name}
                size="small" 
                label={label} 
                type={type}
                variant="filled" 
                onChange={this.handleChange}
                InputLabelProps={shrink}
            />
        )
    }

    render() {if(this.state.redirect){
        return <Redirect to="/recap_proposal"/>
    }
    return (
        <div className="pt-3 d-flex flex-column">
            <div className="row">
                <div className="col-6">
                    {this.renderTextField('nama', 'Nama Proposal', '', null)}
                    {this.renderTextField('tujuan', 'Tujuan', '', null)}
                    {this.renderTextField('tanggal_buat', 'Tanggal dibuat', 'date', {shrink: true,})}
                    <TextField
                        className="mt-3"
                        fullWidth
                        size="small"
                        select
                        label="Jenis"
                        value={this.state.formProposal.jenis}
                        onChange={this.handleChange2}
                        variant="filled"
                        >
                            <MenuItem value="Low">
                                Low
                            </MenuItem>
                            <MenuItem value="Medium">
                                Medium
                            </MenuItem>
                            <MenuItem value="High">
                                High
                            </MenuItem>
                    </TextField>
                </div>
                <div className="col-6">
                <FormControl component="fieldset">
                    <RadioGroup onChange={this.handleChange3} row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="Accept" control={<Radio color="primary" />} label="Accept" />
                        <FormControlLabel value="Pending" control={<Radio color="primary" />} label="Pending" />
                        <FormControlLabel value="Reject" control={<Radio color="primary" />} label="Reject" />
                    </RadioGroup>
                    </FormControl>
                    {this.renderTextField('pj', 'Penanggung Jawab', '', null)}
                    <Button
                        fullWidth
                        size="large"
                        className="mt-3"
                        variant="contained"
                        component="label"
                        >
                        Upload File
                        <input
                            type="file"
                            style={{ display: "none" }}
                        />
                    </Button>
                </div>
            </div>
            <button onClick={this.submit} className="btn btn-lg btn-dark mt-3 align-self-end">Input</button>
        </div>
        )
    }
}

export default inputProposal
