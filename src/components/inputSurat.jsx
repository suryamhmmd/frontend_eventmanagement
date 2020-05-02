import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import axios from '../config/axios';

export class inputSurat extends Component {

    state = {
        formSurat:{
            nosurat:'',
            tanggal_masuk:new Date(),
            tanggal_keluar:new Date(),
            perihal:'',
            surat_dari:'',
            kepada:'',
            pj:''
        },
        redirect: false
    }

    handleChange = (event)=>{
        let {formSurat} = this.state
        formSurat[event.target.name] = event.target.value
        this.setState({formSurat})
    }

    submit = ()=>{
        let {nosurat, tanggal_keluar, tanggal_masuk, perihal, surat_dari, kepada, pj} = this.state.formSurat

        if(!nosurat || !tanggal_keluar || !tanggal_masuk || !perihal || !surat_dari || !kepada || !pj){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }

        let data = this.state.formSurat

        axios.post(`/surat`, data)
        .then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Surat Tersimpan',
                showConfirmButton: false,
                timer: 1500
            })
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

    render() {
        return (
            <div className="pt-3 d-flex flex-column">
                <div className="row">
                    <div className="col-6">
                        {this.renderTextField('nosurat', 'Nomor Surat', '', null)}
                        {this.renderTextField('tanggal_masuk', 'Tanggal Surat Masuk', 'date', {shrink: true,})}
                        {this.renderTextField('tanggal_keluar', 'Tanggal Surat Keluar', 'date', {shrink: true,})}
                        {this.renderTextField('perihal', 'Perihal', '', null)}
                    </div>
                    <div className="col-6">
                        {this.renderTextField('surat_dari', 'Surat Dari', '', null)}
                        {this.renderTextField('kepada', 'Kepada', '', {shrink: true,})}
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

export default inputSurat
