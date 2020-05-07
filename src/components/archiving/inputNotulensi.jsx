import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
import {Redirect} from  'react-router-dom'

export class inputNotulensi extends Component {
       
    state = {
        formRapat:{
            nama_rapat:'',
            tanggal:'',
            tempat:'',
            isi:'',
        },
        redirect: false
    }

    handleChange = (event)=>{
        let {formRapat} = this.state
        formRapat[event.target.name] = event.target.value
        this.setState({formRapat})
    }


    submit = ()=>{
        let {nama_rapat,tanggal,tempat,isi} = this.state.formRapat
        console.log(nama_rapat,tanggal,tempat,isi)
        if(!nama_rapat || !tanggal || !tempat || !isi ){
            Swal.fire({
                icon:'error',
                title:'Field Empty',
                text:'Fields Cannot be Empty'
            })
            return
        }
        let data={nama_rapat,tanggal,tempat,isi, id_event:this.props.event.idEvent, id_user:this.props.user.id_user} 

        console.log(data)
        axios.post(`/notulensi`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Notulensi Tersimpan',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({redirect:true})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    renderTextField = (name, label, type, shrink, multiple, row)=>{
        return(
            <TextField 
                style={{backgroundColor:'white'}} 
                fullWidth 
                multiline={multiple}
                rows={row}
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
        return <Redirect to="/recap_notulensi"/>
    }
    return (
        <div className="pt-3 d-flex flex-column">
            <div className="row">
                <div className="col-6">
                    {this.renderTextField('nama_rapat', 'Nama Rapat', '', null)}
                    {this.renderTextField('tanggal', 'Tanggal', 'date', {shrink: true,})}
                    {this.renderTextField('tempat', 'Tempat', '', )}
                    {this.renderTextField('isi', 'Isi Rapat', '', null, true, 4)}
                </div>
            </div>
            <button onClick={this.submit} className="btn btn-lg btn-dark mt-3 align-self-end">Input</button>
        </div>
        )
    }
}

export default inputNotulensi
