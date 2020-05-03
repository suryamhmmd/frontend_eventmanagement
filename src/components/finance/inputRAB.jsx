import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
import {Redirect} from  'react-router-dom'

export class inputRAB extends Component {

    state = {
        formRab:{
            divisi:'',
            keterangan:'',
            jumlah:'',
            satuan:'',
            harga_satuan:''
        },
        redirect: false
    }

    handleChange = (event)=>{
        let {formRab} = this.state
        formRab[event.target.name] = event.target.value
        this.setState({formRab})
    }

    submit = ()=>{
        let {divisi, keterangan, jumlah, satuan, harga_satuan} = this.state.formRab

        if(!divisi || !keterangan || !jumlah || !satuan || !harga_satuan){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        
        let data = { divisi, keterangan, jumlah, satuan, harga_satuan, id_event:this.props.event.idEvent, id_user:this.props.user.id_user}
    
        axios.post(`/rab`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Surat Tersimpan',
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

    render() {
        if(this.state.redirect){
            return <Redirect to="/recap_rab"/>
        }
        return (
            <div className="pt-3 d-flex flex-column border-top mt-3">
                <div className="row">
                    <div className="col-6">
                        {this.renderTextField('divisi', 'Divisi', '', null)}
                        {this.renderTextField('keterangan', 'Keterangan', '', null)}
                        {this.renderTextField('jumlah', 'Jumlah', '', null)}
                        {this.renderTextField('satuan', 'Satuan ', '', null)}
                        {this.renderTextField('harga_satuan', 'Harga Satuan', '', null)}
                    </div>
                </div>
                <button onClick={this.submit} className="btn btn-lg btn-dark mt-3 align-self-end">Input</button>
            </div>
        )
    }
}

export default inputRAB
