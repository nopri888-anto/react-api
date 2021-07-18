import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Product extends Component{

    state = {
        products: [],
        loading: true,
    }

    async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/products');
        //console.log(res);
        if(res.data.status === 200){
            this.setState({
                products: res.data.products,
                loading: false,
            });
        }
    }

    deleteProduct = async(e, id) => {

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting!";

        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-product/${id}`);
        if(res.data.status === 200){

            thidClickedFunda.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
        }
    }

    render (){

        var product_HTMLTABLE = "";
        if (this.state.loading) {
            product_HTMLTABLE = <tr><td colSpan="7"><h4>Please wait...</h4></td></tr>
        }else{
            product_HTMLTABLE = this.state.products.map( (item,i) => {
                return (
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.productcode}</td>
                    <td>{item.productname}</td>
                    <td>{item.productdescription}</td>
                    <td>{item.price}</td>
                    <td>{item.stok}</td>
                    <td>
                        <Link className="btn btn-success btn-sm" to={`edit-product/${item.id}`}>Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => this.deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                    </tr>
                );
            });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                        <div className="card-header">
                            <h5>Product Data
                            <Link to={'add-product'} className="btn btn-primary btn-sm float-end">Add Product</Link>
                            </h5>
                        </div>
                        <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <th>ID</th>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Product Price</th>
                                <th>Product Stok</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </thead>
                            <tbody>
                            {product_HTMLTABLE}
                            </tbody>
                        </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;