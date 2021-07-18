import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class Addproduct extends Component{
    state = {
        productname : '',
        productcode : '',
        productdescription : '',
        price : '',
        stok : '',
        error_list: [],
    }

    handleInput = (e)=> {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveProduct = async (e) =>{
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/add-product', this.state);
        if(res.data.status === 200)
        {
            //console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
            this.setState({
                productname : '',
                productcode : '',
                productdescription : '',
                price : '',
                stok : '',
            });
        }else{
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    }

    render (){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                        <div className="card-header">
                            <h5>Product Data
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </h5>
                        </div>
                        <div className="card-body">
                        <form onSubmit={this.saveProduct}>
                            <div className="form-group mb-3">
                                <label>Product Name</label>
                                <input type="text" name="productname" onChange={this.handleInput} value={this.state.productname} className="form-control" />
                                <span className="text-danger">{this.state.error_list.productname}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Product Kode</label>
                                <input type="text" name="productcode" onChange={this.handleInput} value={this.state.productcode}  className="form-control" />
                                <span className="text-danger">{this.state.error_list.productcode}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Product Description</label>
                                <input type="text" name="productdescription" onChange={this.handleInput} value={this.state.productdescription} className="form-control" />
                                <span className="text-danger">{this.state.error_list.productdescription}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Product Price</label>
                                <input type="text" name="price" onChange={this.handleInput} value={this.state.price}  className="form-control" />
                                <span className="text-danger">{this.state.error_list.price}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Product Stok</label>
                                <input type="text" name="stok" onChange={this.handleInput} value={this.state.stok}  className="form-control" />
                                <span className="text-danger">{this.state.error_list.stok}</span>
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" value="" className="btn btn-primary">Save Product</button>
                            </div>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addproduct;