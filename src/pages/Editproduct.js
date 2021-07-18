import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class Editproduct extends Component{
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

    async componentDidMount(){
        const prod_id = this.props.match.params.id;
        // console.log(prod_id);
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-product/${prod_id}`);
        if(res.data.status === 200){
            this.setState({
                productname : res.data.product.productname,
                productcode : res.data.product.productcode,
                productdescription : res.data.product.productdescription,
                price : res.data.product.price,
                stok : res.data.product.stok,
            });
        }else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
              });

              this.props.history.push('/');
        }
    }

    updateProduct = async (e) =>{
        e.preventDefault();

        // document.getElementById('updatebtn').disabled = true;
        // document.getElementById('updatebtn').innerText = "Updating!";
        const prod_id = this.props.match.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-product/${prod_id}`, this.state);
        if(res.data.status === 200)
        {
            //console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
              this.props.history.push('/');
            // document.getElementById('updatebtn').disabled = false;
            // document.getElementById('updatebtn').innerText = "Update Product";
            
        }else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
              });

              this.props.history.push('/');
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
                            <h5>Edit Product
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </h5>
                        </div>
                        <div className="card-body">
                        <form onSubmit={this.updateProduct}>
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
                                <button type="submit" id="updatebtn" value="" className="btn btn-primary">Update Product</button>
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

export default Editproduct;