import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
import {Redirect} from  'react-router-dom'

export class inputMoU extends Component {
    
    state = {
        formMou:{
            nama_instansi:'',
            nama_panitia:'',
            jabatan:'',
            divisi:'',
            tanggal:'',
            deskripsi:'',
        },
        redirect: false
    }

    handleChange = (event)=>{
        let {formMou} = this.state
        formMou[event.target.name] = event.target.value
        this.setState({formMou})
    }

    submit = ()=>{
        let {nama_instansi,nama_panitia, jabatan, divisi, tanggal, deskripsi } = this.state.formMou

        if(!nama_instansi || !nama_panitia || !jabatan || !divisi || !tanggal || !deskripsi){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data={nama_instansi,nama_panitia, jabatan, divisi, tanggal, deskripsi, id_event:this.props.event.idEvent, id_user:this.props.user.id_user} 

        console.log(data)
        // axios.post(`/surat`, data)
        // .then(res=>{
        //     Swal.fire({
        //         position: 'center',
        //         icon: 'success',
        //         title: 'Surat Tersimpan',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     this.setState({redirect:true})
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
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
        return <Redirect to="/recap_surat"/>
    }
    return (
        <div className="pt-3 d-flex flex-column">
            <div className="row">
                <div className="col-6">
                    {this.renderTextField('nama_instansi', 'Nama Instansi', '', null)}
                    {this.renderTextField('nama_panitia', 'Nama Panitia', '', null)}
                    {this.renderTextField('jabatan', 'Jabatan', '', null)}
                    {this.renderTextField('deskripsi', 'Deskripsi Perjanjian', '', null)}
                </div>
                <div className="col-6">
                    {this.renderTextField('tanggal', 'Tanggal Kontrak', '', {shrink: true,})}
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

export default inputMoU
