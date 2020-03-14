import React from 'react'
import Axios from 'axios'
import './../supports/LatihanDataMurid.css'

class LatihanApi2 extends React.Component{
    state = {
        data : [],
       
    }

    componentDidMount(){
        this.getDataFromApi()
    }

    getDataFromApi = () => {
        Axios.get('http://localhost:3002/murid')
        .then((res) => {
            console.log(res)
            this.setState({data:res.data})
        })

        .catch((err) => {
            console.log(err)
        })
    }

    onAddBtnClick =() =>{
        var inputNamaLengkap = this.refs.nama_lengkap.value
        var inputTahunLahir = this.refs.tahun_lahir.value
        var inputImageLink = this.refs.image_url.value
        if(inputNamaLengkap && inputTahunLahir && inputImageLink){
            var data = {
                nama_lengkap : inputNamaLengkap,
                tahun_lahir : inputTahunLahir,
                image_url : inputImageLink
            }
    
            Axios.post('http://localhost:3002/murid',data)
            .then((res) => {
               this.getDataFromApi()
            })
    
            .catch((err) => {
                console.log(err)
            })

        }

        else{
            alert('data harus isi semua')
        }
    }

    onDeleteBtn=(id) => {
        Axios.delete('http://localhost:3002/murid/' + id)
         .then((res) => {
               this.getDataFromApi()
            })
    
            .catch((err) => {
                console.log(err)
            })
    }

    printData = () => {
        // var output = []
        // for(var i =0 ; i<this.state.data.length; i++){
        // output.push(

        // <div className='my-card col-sm-2 mr-3 mt-3'>
        //     <img src={this.state.data[i].image_url} width='100%' alt=""/>
        //     <div className='farmhub-product-title'>{this.state.data[i].nama_lengkap}</div>
        //     <div className='farmhub-product-location'>{this.state.data[i].tahun_lahir}</div>
        //     <span className='btn btn-outline-danger mt-3 mb-3 ml-2'>Delete</span>
        // </div>

        // )     
        // } 

        var output = this.state.data.map((val) => {
            return(
                
                <div className='my-card col-sm-2 mr-3 mt-3'>
                    <img src={val.image_url} width='100%' alt=""/>
                    <div className='farmhub-product-title'>{val.nama_lengkap}</div>
                    <div className='farmhub-product-location'>Usia : {2020-val.tahun_lahir} tahun</div>
                    <span className='btn btn-outline-danger mt-3 mb-3 ml-2'onClick={() => this.onDeleteBtn(val.id)}>Delete</span>
                </div>

            )
        })

        return output
        
    }





    render(){
        return(
            <div className="text-center py-5 my-5">
            <h1 > Form Submit Data Murid</h1>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <div className="form-submit container" style={{border:"1px solid lightblue"}}>
                        <input  type="text" ref="nama_lengkap" className="form-control mt-5 " placeholder="Masukkan Nama Lengkap"/>
                        <input  type="text" ref="tahun_lahir" className="form-control mt-3" placeholder="Masukkan Tahun Lahir"/>
                        <input  type="text" ref="image_url" className="form-control mt-3" placeholder="Masukkan Link Foto Data Diri"/>
                        <button onClick={this.onAddBtnClick} className="btn btn-outline-primary mt-3 mb-5">Submit</button>                 
                    </div>
                </div>

            </div>
            <div className="container mt-5 py-5">
                <div className="row">
                    {this.printData()}
                                     
                </div>

            </div>

        </div>
        )
    }
}

export default LatihanApi2;