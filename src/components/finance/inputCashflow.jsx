import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from  'react-router-dom'
export class inputCashflow extends Component {

    state = {
        formCashflow:{
            jenis:'',
            divisi:'',
            jumlah:'',
            tanggal:'',
            deskripsi:'',
        },
        redirect: false
    }

    handleChange = (event)=>{
        let {formCashflow} = this.state
        formCashflow[event.target.name] = event.target.value
        this.setState({formCashflow})
    }

    handleChange2 = (event)=>{
        let {formCashflow} = this.state
        formCashflow['jenis'] = event.target.value
        this.setState({formCashflow})
    }

    submit = ()=>{
        let {jenis, divisi, jumlah,tanggal, deskripsi} = this.state.formCashflow

        if(!jenis || !divisi || !jumlah || !tanggal || !deskripsi){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data={jenis, divisi, jumlah,tanggal, deskripsi, id_event:this.props.event.idEvent, id_user:this.props.user.id_user} 

        axios.post(`/cashflow`, data)
        .then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cashflow Tersimpan',
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
        return <Redirect to="/recap_cashflow"/>
    }
    return (
        <div className="pt-3 d-flex flex-column">
            <div className="row">
                <div className="col-6">
                    <TextField
                        className="mt-3"
                        fullWidth
                        size="small"
                        select
                        label="Jenis"
                        value={this.state.formCashflow.jenis}
                        onChange={this.handleChange2}
                        variant="filled"
                        >
                            <MenuItem value="Pengeluaran">
                                Pengeluaran
                            </MenuItem>
                            <MenuItem value="Pemasukan">
                                Pemasukan
                            </MenuItem>

                    </TextField>
                    {this.renderTextField('divisi', 'Divisi', '', null)}
                    {this.renderTextField('jumlah', 'Jumlah', '', null)}
                </div>
                <div className="col-6">                
                    {this.renderTextField('tanggal', 'Tanggal', 'date', {shrink: true,})} 
                    {this.renderTextField('deskripsi', 'Deskripsi', '', null)}
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

export default inputCashflow